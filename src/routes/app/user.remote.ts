import { command, form, query } from '$app/server';
import { riotIdSchema } from '$lib/schema';
import { prisma, type PrismaUser } from '$lib/server/prisma';
import riotClient from '$lib/server/riotClient';
import { invalid, redirect } from '@sveltejs/kit';
import { getSession } from './validate.remote';
import { getEndOfDay, getEndOfWeek, getRequiredXp, toRegion } from '$lib/helpers';
import { matchService } from '$lib/server/services/matchService';
import { challengeService } from '$lib/server/services/challengeService';
import z from 'zod';
import { challengeReward, challengesDetails } from '$lib/constants/challenges';

async function checkAuth() {
	const session = await getSession();
	if (session?.user === undefined) redirect(303, '/sign-in');

	return session;
}

export const getUser = query(async () => {
	console.log('getUser()');
	const { user } = await checkAuth();
	const userFromDb = await prisma.user.findFirstOrThrow({ where: { id: user.id } });
	return userFromDb as PrismaUser;
});

export const updateRiotId = form(riotIdSchema, async (data) => {
	console.log('updateRiotId()');
	const { session } = await checkAuth();

	const account = await riotClient.getAccountByRiotId(data);
	console.log(account);
	if (!account) return invalid('Riot account not found');

	const region = await riotClient.getActiveRegion(account.puuid);
	if (!region) return invalid('Could not find an active region associated with the account');

	const summoner = await riotClient.getSummoner(account.puuid, region.region);
	if (!summoner) return invalid('Summoner not found');

	const user = await prisma.user.update({
		where: { id: session.userId },
		data: {
			puuid: account.puuid,
			platform: region.region,
			profileIconId: summoner.profileIconId,
			gameName: account.gameName,
			tagLine: account.tagLine,
			lastUpdatedAt: 0,
			region: toRegion(region.region)
		}
	});
	if (!user.puuid) throw new Error();

	await challengeService.generateDailyChallenges(user.puuid);
	await challengeService.generateWeeklyChallenges(user.puuid);

	redirect(303, '/app');
});

export const update = command(async () => {
	console.log('update()');
	await checkAuth();

	const user = await getUser();
	if (!user.puuid) return redirect(303, '/app/riotid');

	// const FIVE_MINUTES = 5 * 60 * 1000;
	const FIVE_SECONDS = 5 * 1000;
	if (Date.now() - user.lastUpdatedAt < FIVE_SECONDS) return;
	await prisma.user.update({ where: { id: user.id }, data: { lastUpdatedAt: Date.now() } });

	await getUser().refresh();

	if (getEndOfWeek(user.lastUpdatedAt) < Date.now()) {
		await challengeService.generateWeeklyChallenges(user.puuid);
	}
	if (getEndOfDay(user.lastUpdatedAt) < Date.now()) {
		await challengeService.generateDailyChallenges(user.puuid);
	}

	const allMatchIds = await matchService.getAllRelevantMatchIds(user);
	console.log('allMatchIds: ', allMatchIds);
	if (allMatchIds.length === 0) return;

	const allMatches = await matchService.getMatches(user, allMatchIds);

	await challengeService.evaluateMany(user, allMatches);

	await getChallenges().refresh();
});

export const getChallenges = query(async () => {
	await checkAuth();
	const user = await getUser();
	if (!user.puuid) redirect(303, '/app/riotid');

	return await prisma.challenge.findMany({
		where: {
			userPuuid: user.puuid,
			OR: [{ toTime: { gt: user.lastUpdatedAt } }, { collectable: true }]
		}
	});
});

export const claimReward = command(z.string(), async (id) => {
	await checkAuth();
	const user = await getUser();
	if (!user.puuid) redirect(303, '/app/riotid');

	const challenge = await prisma.challenge.findFirst({ where: { id: id } });
	if (!challenge) invalid('challenge not found');
	if (challenge.userPuuid !== user.puuid) invalid('invalid access to challenge');
	if (!challenge.collectable) invalid('challenge not ready to be collected');

	const details = challengesDetails.find((ch) => challenge.challengeId === ch.id)!;
	await prisma.challenge.update({
		where: {
			id: challenge.id
		},
		data: { collectable: false }
	});

	let reward = challengeReward[details.difficulty];
	reward *= details.mode === 'weekly' ? 3 : 1;
	user.xp += reward;
	while (user.xp >= getRequiredXp(user.level)) {
		user.xp -= getRequiredXp(user.level);
		user.level += 1;
	}
	await prisma.user.update({
		where: { id: user.id },
		data: {
			level: user.level,
			xp: user.xp
		}
	});

	await getUser().refresh();
	await getChallenges().refresh();
});
