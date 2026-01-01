import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
	// console.log('Handle');
	// console.log('RouteId: ', event.route.id);
	// console.log('Pathname: ', event.url.pathname);
	// console.log('Remote: ', event.isRemoteRequest);
	// if (event.route.id?.startsWith('/app') || event.isRemoteRequest) {
	// 	//     console.log('Handle getSession')
	// 	const session = await auth.api.getSession({
	// 		headers: event.request.headers
	// 	});
	// 	if (!session) redirect(307, '/sign-in');
	// 	console.log('Handle set locals');
	// 	event.locals.session = session.session;
	// 	event.locals.user = session.user;

	// 	// if (event.route.id !== '/app/riotid' && !session.user.puuid) {
	// 	// 	redirect(303, '/app/riotid');
	// 	// }
	// }
	// console.log('hooks');
	return svelteKitHandler({ event, resolve, auth, building });
}
