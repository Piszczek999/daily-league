import { prisma, type PrismaUser } from '../prisma';
import riotClient from '$lib/server/riotClient';
import { getEndOfWeek, getStartOfWeek } from '$lib/helpers';
import type { Match } from '@prisma/client';

class MatchService {
	async getAllRelevantMatchIds(user: PrismaUser) {
		// return ['EUN1_3871123908'];
		if (!user.puuid) throw new Error();
		if (getEndOfWeek(user.lastUpdatedAt) < Date.now()) {
			if (getEndOfWeek(user.lastUpdatedAt) + 1 === getStartOfWeek()) {
				return await riotClient.getListOfMatchIds(user, {
					startTime: getStartOfWeek(user.lastUpdatedAt),
					endTime: getEndOfWeek(),
					count: 100
				});
			}

			return [
				...(await riotClient.getListOfMatchIds(user, {
					startTime: getStartOfWeek(user.lastUpdatedAt),
					endTime: getEndOfWeek(user.lastUpdatedAt),
					count: 100
				})),
				...(await riotClient.getListOfMatchIds(user, {
					startTime: getStartOfWeek(),
					endTime: getEndOfWeek(),
					count: 100
				}))
			];
		}
		return await riotClient.getListOfMatchIds(user, {
			startTime: getStartOfWeek(),
			count: 100
		});
	}

	async getMatches(user: PrismaUser, matchIds: string[]): Promise<Match[]> {
		// test if getUser() works
		if (!user.puuid) throw new Error();

		const existingMatchesId = (
			await prisma.match.findMany({
				where: {
					matchId: { in: matchIds }
				},
				select: {
					matchId: true
				}
			})
		).map((match) => match.matchId);

		const missingMatchIds = matchIds.filter((id) => !existingMatchesId.includes(id));

		const newMatches = await Promise.all(
			missingMatchIds.map((id) => riotClient.getMatch(id, user.region))
		);
		if (newMatches.length !== 0) {
			await prisma.match.createMany({
				data: newMatches.map((match) => ({
					matchId: match.metadata.matchId,
					gameEndTimestamp: match.info.gameEndTimestamp,
					data: JSON.parse(JSON.stringify(match))
				}))
			});
		}

		return await prisma.match.findMany({
			where: {
				matchId: {
					in: matchIds
				}
			}
		});
	}
}

export const matchService = new MatchService();
