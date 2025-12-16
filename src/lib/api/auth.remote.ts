import { getRequestEvent, query } from '$app/server';
import { auth } from '$lib/server/auth';

export const getSession = query(() => {
	return auth.api.getSession({
		headers: getRequestEvent().request.headers
	});
});

// export const signIn = form(async () => {
// 	console.log('signIn');

// 	const result = await auth.api.signInSocial({
// 		body: {
// 			provider: 'github',
// 			callbackURL: '/app'
// 		},
// 		headers: getRequestEvent().request.headers
// 	});

// 	// The signInSocial returns a redirect URL to GitHub
// 	if (result.url) {
// 		redirect(303, result.url);
// 	}
// });

// export const signOut = form(async () => {
// 	await auth.api.signOut({ headers: getRequestEvent().request.headers });
// 	redirect(303, '/');
// });
