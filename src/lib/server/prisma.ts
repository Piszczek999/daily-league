import 'dotenv/config';
import { PrismaClient } from '../../generated/client';

const prisma = new PrismaClient();

export { prisma };

export async function getUser(userId: string) {
	return await prisma.user.findFirstOrThrow({ where: { id: userId } });
}
