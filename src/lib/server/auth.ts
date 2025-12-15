import { betterAuth } from 'better-auth';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'mongodb' }),
	socialProviders: {
		github: {
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}
	}
});
