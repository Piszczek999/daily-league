import { SESSION_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import prisma from '$lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		})
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		jwt: ({ token, user, account, profile, session, trigger }) => {
			console.log('JWT');
			console.log('Token: ', token);
			console.log('User: ', user);
			console.log('Account: ', account);
			console.log('Profile: ', profile);
			console.log('Session: ', session);
			console.log('Trigger: ', trigger);
			return token;
		},
		session: ({ newSession, session, token, trigger }) => {
			console.log('Session');
			console.log('NewSession: ', newSession);
			console.log('Session: ', session);
			console.log('Token: ', token);
			console.log('Trigger: ', trigger);
			return session;
		}
	},
	secret: SESSION_SECRET
});
