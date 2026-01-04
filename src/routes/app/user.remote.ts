import { command, form, getRequestEvent, query } from "$app/server";
import { riotIdSchema } from "$lib/schema";
import { prisma } from "$lib/server/prisma";
import riotClient from "$lib/server/riotClient";
import { error, invalid, redirect } from "@sveltejs/kit";
import { getEndOfDay, getEndOfWeek, getRequiredXp } from "$lib/helpers";
import { matchService } from "$lib/server/services/matchService";
import { challengeService } from "$lib/server/services/challengeService";
import z from "zod";
import { challengeDetailsMap, challengeReward } from "$lib/constants/challenges";
import { config } from "$lib/server/config";
import { auth } from "$lib/server/auth";
import { PLATFORM_TO_REGION } from "$lib/constants/regions";

const userLocks = new Map<string, Promise<unknown>>();

async function withUserLock<T>(userId: string, fn: () => Promise<T>): Promise<T | null> {
	const existingLock = userLocks.get(userId);
	if (existingLock) {
		await existingLock.catch(() => {}); // Wait for existing operation
		return null; // Abort this call
	}

	const lockPromise = fn().finally(() => {
		userLocks.delete(userId);
	});

	userLocks.set(userId, lockPromise as Promise<void>);
	return await lockPromise;
}

export const getUser = query(async () => {
	console.log("getUser()");
	const session = await auth.api.getSession({
		headers: getRequestEvent().request.headers
	});
	if (!session) error(401, "User not Authenticated");
	return await prisma.user.findFirstOrThrow({ where: { id: session.user.id } });
});

export const updateRiotId = form(riotIdSchema, async (data) => {
	console.log("updateRiotId()");
	let user = await getUser();

	if (user.puuid) return invalid("Riot account already linked to this account");

	const account = await riotClient.getAccountByRiotId(data);
	if (!account) return invalid("Riot account not found");

	const regionResponse = await riotClient.getActiveRegion(account.puuid);
	if (!regionResponse)
		return invalid("Could not find an active region associated with the account");

	const summoner = await riotClient.getSummoner(account.puuid, regionResponse.region);
	if (!summoner) return invalid("Summoner not found");

	user.lastUpdatedAt = Date.now() - config.updateCooldown;
	user = await prisma.user.update({
		where: { id: user.id },
		data: {
			puuid: account.puuid,
			platform: regionResponse.region,
			profileIconId: summoner.profileIconId,
			gameName: account.gameName,
			tagLine: account.tagLine,
			lastUpdatedAt: Date.now() - config.updateCooldown,
			region: PLATFORM_TO_REGION[regionResponse.region]
		}
	});
	await Promise.all([
		challengeService.generateDailyChallenges(user),
		challengeService.generateWeeklyChallenges(user)
	]);

	getUser().set(user);
	// await getChallenges().refresh();
	await update();

	redirect(303, "/app");
});

export const update = command(async () => {
	const user = await getUser();
	if (!user.puuid) error(400, "RiotId not linked to user");

	const updatedUser = await withUserLock(user.id, async () => {
		// Atomically check cooldown and claim the update
		const currentUser = await prisma.user.findUnique({ where: { id: user.id } });
		if (!currentUser) throw new Error("User not found");

		const timeSinceUpdate = Date.now() - currentUser.lastUpdatedAt;
		if (timeSinceUpdate < config.updateCooldown) return null;

		// Update timestamp immediately to prevent other requests
		const updatedTimestamp = Date.now();
		await prisma.user.update({
			where: { id: user.id },
			data: { lastUpdatedAt: Date.now() }
		});

		// Generate challenges if day/week rolled over
		if (getEndOfDay(currentUser.lastUpdatedAt) < updatedTimestamp) {
			await challengeService.generateDailyChallenges(currentUser);
			if (getEndOfWeek(currentUser.lastUpdatedAt) < updatedTimestamp) {
				await challengeService.generateWeeklyChallenges(currentUser);
			}
		}

		// Process new matches
		const allMatchIds = await matchService.getAllRelevantMatchIds(currentUser);
		if (allMatchIds.length > 0) {
			const allMatches = await matchService.getMatches(currentUser.region, allMatchIds);
			await challengeService.evaluateMany(currentUser, allMatches);
		}

		// Return fresh user data
		return await prisma.user.findUnique({ where: { id: user.id } });
	});

	if (!updatedUser) return;

	getUser().set(updatedUser);
	await getChallenges().refresh();
});

export const getChallenges = query(async () => {
	const user = await getUser();
	if (!user.puuid) error(400, "RiotId not linked to user");

	return await prisma.challenge.findMany({
		where: {
			userId: user.id,
			OR: [{ toTime: { gt: user.lastUpdatedAt } }, { collectable: true }]
		}
	});
});

export const claimReward = command(z.string(), async (id) => {
	const user = await getUser();
	if (!user.puuid) error(400, "RiotId not linked to user");

	const updatedUser = await withUserLock(user.id, async () => {
		// Find and validate challenge
		const challenge = await prisma.challenge.findFirst({
			where: {
				id: id,
				userId: user.id,
				collectable: true
			}
		});

		if (!challenge) error(404, "Challenge not found or not collectable");

		// Mark as collected
		await prisma.challenge.update({
			where: { id: challenge.id },
			data: { collectable: false }
		});

		// Calculate reward
		const details = challengeDetailsMap.get(challenge.challengeId)!;
		let reward = challengeReward[details.difficulty];
		reward *= details.mode === "weekly" ? 3 : 1;

		// Calculate new XP and level
		let newXp = user.xp + reward;
		let newLevel = user.level;
		while (newXp >= getRequiredXp(newLevel)) {
			newXp -= getRequiredXp(newLevel);
			newLevel += 1;
		}

		// Update user
		return await prisma.user.update({
			where: { id: user.id },
			data: { xp: newXp, level: newLevel }
		});
	});

	if (!updatedUser) return;

	getUser().set(updatedUser);
	await getChallenges().refresh();
});

export const getLeaderboard = query(async () => {
	return await prisma.user.findMany({
		where: { profileIconId: { not: 0 } },
		orderBy: [{ level: "desc" }, { xp: "desc" }],
		select: {
			name: true,
			gameName: true,
			profileIconId: true,
			tagLine: true,
			level: true,
			xp: true
		},
		take: 10
	});
});
