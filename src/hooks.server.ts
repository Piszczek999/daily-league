import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from '$lib/server/auth';
import { sequence } from '@sveltejs/kit/hooks';
import { DATABASE_URL } from '$env/static/private';

process.env.DATABASE_URL = DATABASE_URL;

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/app')) {
		const session = await event.locals.auth();
		if (!session?.user) {
			const callbackUrl = event.url.pathname + event.url.search;
			throw redirect(303, `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
		}
		event.locals.user = session.user;
	}

	return resolve(event);
};

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
