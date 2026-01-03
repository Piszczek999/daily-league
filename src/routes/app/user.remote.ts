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
	await challengeService.generateDailyChallenges(user);
	await challengeService.generateWeeklyChallenges(user);

	getUser().set(user);
	// await getChallenges().refresh();
	await update();

	redirect(303, "/app");
});

export const update = command(async () => {
	console.log("update()");
	let user = await getUser();
	if (!user.puuid) error(400, "RiotId not linked to user");

	if (Date.now() - user.lastUpdatedAt < config.updateCooldown) return;

	if (getEndOfDay(user.lastUpdatedAt) < Date.now()) {
		await challengeService.generateDailyChallenges(user);
		if (getEndOfWeek(user.lastUpdatedAt) < Date.now()) {
			await challengeService.generateWeeklyChallenges(user);
		}
	}

	const allMatchIds = await matchService.getAllRelevantMatchIds(user);
	console.log(allMatchIds);
	if (allMatchIds.length !== 0) {
		const allMatches = await matchService.getMatches(user.region, allMatchIds);

		await challengeService.evaluateMany(user, allMatches);
	}

	user = await prisma.user.update({
		where: { id: user.id },
		data: { lastUpdatedAt: Date.now() }
		// data: { lastUpdatedAt: Date.now(), xp: { increment: 10 } }
	});

	getUser().set(user);
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
	let user = await getUser();
	if (!user.puuid) error(400, "RiotId not linked to user");

	const challenge = await prisma.challenge.findFirst({ where: { id: id } });
	if (!challenge) error(404, "challenge not found");
	if (challenge.userId !== user.id) error(401, "invalid access to challenge");
	if (!challenge.collectable) error(400, "challenge cant be collected");

	const details = challengeDetailsMap.get(challenge.challengeId)!;
	await prisma.challenge.update({
		where: {
			id: challenge.id
		},
		data: { collectable: false }
	});

	let reward = challengeReward[details.difficulty];
	reward *= details.mode === "weekly" ? 3 : 1;
	user.xp += reward;
	while (user.xp >= getRequiredXp(user.level)) {
		user.xp -= getRequiredXp(user.level);
		user.level += 1;
	}
	user = await prisma.user.update({
		where: { id: user.id },
		data: {
			xp: user.xp,
			level: user.level
		}
	});

	getUser().set(user);
	await getChallenges().refresh();
});
