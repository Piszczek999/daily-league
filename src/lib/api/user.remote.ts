import { form, getRequestEvent, query } from '$app/server';
import { riotIdSchema } from '$lib/schema';
import { prisma } from '$lib/server/prisma';
import riotClient from '$lib/server/riotClient';
import { invalid, redirect } from '@sveltejs/kit';

// async function requireAuth() {
// 	const session = await getSession();
// 	if (session?.user === undefined) redirect(303, '/sign-in');
// 	return session.user;
// }

// async function requireRiotId() {
// 	const session = await getSession();
// 	if (!session?.user.puuid) redirect(303, '/app/riotid');
// 	return session.user;
// }

export const getUser = query(async () => {
	console.log('getUser');
	const user = getRequestEvent().locals.user;
	return await prisma.user.findFirstOrThrow({ where: { id: user.id } });
});

export const updateRiotId = form(riotIdSchema, async (data) => {
	const user = getRequestEvent().locals.user;
	const account = await riotClient.getAccountByRiotId(data);
	if (!account) return invalid('Riot account not found');

	const region = await riotClient.getActiveRegion(account.puuid);
	if (!region) return invalid('Could not find an active region associated with the account');

	const summoner = await riotClient.getSummoner(account.puuid, region.region);
	if (!summoner) return invalid('Summoner not found');

	await prisma.user.update({
		where: { id: user.id },
		data: {
			puuid: account.puuid,
			platform: region.region,
			profileIconId: summoner.profileIconId,
			gameName: account.gameName,
			tagLine: account.tagLine
		}
	});

	redirect(303, '/app');
});

// export const update = command(async () => {
//     const user = await requireAuth()
//     const
// });
