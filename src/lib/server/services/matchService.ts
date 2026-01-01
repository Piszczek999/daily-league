import { prisma } from '../prisma';
import riotClient from '$lib/server/riotClient';
import { getEndOfWeek, getStartOfWeek } from '$lib/helpers';
import type { Match, User } from '@prisma/client';

class MatchService {
	async getAllRelevantMatchIds(user: User) {
		// return ['EUN1_3871123908'];
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

	async getMatches(user: User, matchIds: string[]): Promise<Match[]> {
		const existingMatchIds = new Set(
			(
				await prisma.match.findMany({
					where: {
						matchId: { in: matchIds }
					},
					select: {
						matchId: true
					}
				})
			).map((match) => match.matchId)
		);
		const missingMatchIds = matchIds.filter((id) => !existingMatchIds.has(id));

		const BATCH_SIZE = 20;
		const newMatches = [];
		for (let i = 0; i < missingMatchIds.length; i += BATCH_SIZE) {
			const batch = missingMatchIds.slice(i, i + BATCH_SIZE);
			const batchMatches = await Promise.all(
				batch.map((id) => riotClient.getMatch(id, user.region))
			);
			newMatches.push(...batchMatches);

			// Optional: add delay between batches to avoid rate limiting
			if (i + BATCH_SIZE < missingMatchIds.length) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
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
