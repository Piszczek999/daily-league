import 'dotenv/config';
import type { Platform, Region } from '$lib/types/riotTypes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };

type LinkedPrismaUser = {
	puuid: string;
	profileIconId: number;
	gameName: string;
	tagLine: string;
	platform: Platform;
	region: Region;
	lastUpdatedAt: number;
	xp: number;
	level: number;
	challenges: {
		id: number;
		progress: string;
	}[];
};

type NonLinkedPrismaUser = {
	puuid: null;
};

export type PrismaUser = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
} & (LinkedPrismaUser | NonLinkedPrismaUser);

export async function getUser(userId: string) {
	const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
	return user as PrismaUser;
}
