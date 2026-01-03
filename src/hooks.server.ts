import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
	// console.log('Handle ', event.request.url);
	// if (event.isRemoteRequest) {
	// 	console.log('Handle remote', event.request.url);
	// 	const session = await auth.api.getSession({
	// 		headers: event.request.headers
	// 	});
	// 	if (!session) error(401, 'User not Authenticated');
	// 	console.log('Set locals');
	// 	event.locals.session = session.session;
	// 	event.locals.sessionUser = session.user;
	// 	event.locals.user = await prisma.user.findFirstOrThrow({ where: { id: session.user.id } });
	// }
	return svelteKitHandler({ event, resolve, auth, building });
}
