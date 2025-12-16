import { betterAuth } from 'better-auth/minimal';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'mongodb' }),
	socialProviders: {
		github: {
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}
	},
	user: {
		additionalFields: {
			puuid: {
				type: 'string',
				required: false,
				input: false
			}
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
