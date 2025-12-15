import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import riotClient from '$lib/server/riotClient';
import { z } from 'zod';
import { getUser, prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (user.puuid) redirect(302, '/app');
};

export const actions: Actions = {
	async default({ request, locals }) {
		if (!locals.session) redirect(302, '/auth/signin');
		const user = await getUser(locals.session.userId);
		if (user.isLinked) error(400, 'Your account is already linked to a summoner');

		const form = await request.formData();
		const data = Object.fromEntries(form);

		const schema = z.object({
			gameName: z.string().min(3).max(16),
			tagLine: z.string().min(3).max(5)
		});
		const res = schema.safeParse(data);
		if (!res.success) {
			return fail(400, { errors: res.error.issues.map((i) => i.message) });
		}
		const { gameName, tagLine } = res.data;

		const account = await riotClient.getAccountByRiotId(gameName, tagLine);
		if (!account) return fail(404, { errors: ['Riot account not found'] });

		const region = await riotClient.getActiveRegion(account.puuid);
		if (!region) return fail(500);

		const summoner = await riotClient.getSummoner(account.puuid, region.region);
		if (!summoner) return fail(500);

		await prisma.user.update({
			where: { id: locals.session.userId },
			data: {
				isLinked: true,
				puuid: account.puuid,
				platform: region.region,
				profileIconId: summoner.profileIconId,
				gameName: account.gameName,
				tagLine: account.tagLine
			}
		});

		redirect(303, '/app');
	}
};
