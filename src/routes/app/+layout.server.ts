import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getUser } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.session) redirect(302, '/auth/signin');
	const user = await getUser(locals.session.userId);

	if (url.pathname != '/app/riotid' && !user.isLinked) redirect(302, '/app/riotid');

	return {
		user: user
	};
};
