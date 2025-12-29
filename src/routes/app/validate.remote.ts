import { getRequestEvent, query } from '$app/server';
import { auth } from '$lib/server/auth';

export const getSession = query(async () => {
	const event = getRequestEvent();
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	return session;
});

// export const checkRiotId = query(async () => {
// 	const { event, session } = await getSession();
// 	if (session?.user.puuid === undefined) redirect(303, '/app/riotid');

// 	return { ...event, ...session };
// });
