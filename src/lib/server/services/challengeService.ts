import { challengesDetails } from '$lib/constants/challenges';
import { getEndOfDay, getEndOfWeek, getStartOfDay, getStartOfWeek } from '$lib/helpers';
import type { RiotMatch } from '$lib/types/riotTypes';
import type { Match } from '../../../generated/client';
import type { ChallengeCreateManyInput } from '../../../generated/models';
import { config } from '../config';
import { prisma, type PrismaUser } from '../prisma';

class ChallengeService {
	async evaluateMany(user: PrismaUser, matches: Match[]) {
		if (!user.puuid) throw new Error();

		const challenges = await prisma.challenge.findMany({
			where: { toTime: { gt: user.lastUpdatedAt }, completed: false }
		});
		const participantMatches = matches.map(
			(match) =>
				(match.data as unknown as RiotMatch).info.participants.find((p) => p.puuid == user.puuid)!
		);
		for (const challenge of challenges) {
			const challengeDetails = challengesDetails.find((ch) => ch.id === challenge.challengeId)!;
			console.log(`${challengeDetails.title}: ${challengeDetails.description}`);

			let sum = 0;
			for (const participant of participantMatches) {
				console.log(`├ ${participant.championName}: ${challengeDetails.fn(participant)}`);
				sum += Number(challengeDetails.fn(participant));

				if (sum >= challengeDetails.treshhold) {
					challenge.completed = true;
					challenge.collectable = true;
					challenge.progress = sum;
					// break;
				}
			}
			console.log(`└ Sum: ${sum} / ${challengeDetails.treshhold}`);
			challenge.progress = sum;
		}
		await prisma.$transaction(
			challenges.map((challenge) =>
				prisma.challenge.update({
					where: { id: challenge.id },
					data: {
						completed: challenge.completed,
						collectable: challenge.collectable,
						progress: challenge.progress
					}
				})
			)
		);
	}

	async generateDailyChallenges(userPuuid: string) {
		const dailyChallenges = challengesDetails.filter((ch) => ch.mode === 'daily');
		if (config.dailyChallengesCount > dailyChallenges.length) throw new Error();

		const challenges = [...dailyChallenges]
			.sort(() => Math.random() - 0.5)
			.slice(0, config.dailyChallengesCount);

		await prisma.challenge.createMany({
			data: challenges.map<ChallengeCreateManyInput>((challenge) => ({
				challengeId: challenge.id,
				fromTime: getStartOfDay(),
				toTime: getEndOfDay(),
				userPuuid: userPuuid
			}))
		});
	}

	async generateWeeklyChallenges(userPuuid: string) {
		const weeklyChallenges = challengesDetails.filter((ch) => ch.mode === 'weekly');
		if (config.weeklyChallengesCount > weeklyChallenges.length) throw new Error();

		const challenges = [...weeklyChallenges]
			.sort(() => Math.random() - 0.5)
			.slice(0, config.weeklyChallengesCount);

		await prisma.challenge.createMany({
			data: challenges.map<ChallengeCreateManyInput>((challenge) => ({
				challengeId: challenge.id,
				fromTime: getStartOfWeek(),
				toTime: getEndOfWeek(),
				userPuuid: userPuuid
			}))
		});
	}
}

export const challengeService = new ChallengeService();
