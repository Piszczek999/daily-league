import type { RiotPlayerData } from '$lib/types/riotTypes';

type ChallengeDetails = {
	id: string;
	title: string;
	description: string;
	category: 'combat' | 'wins' | 'macro' | 'vision' | 'objectives' | 'economy' | 'role' | 'champion';
	mode: 'daily' | 'weekly';
	difficulty: 'easy' | 'normal' | 'hard';
	fn: (participant: RiotPlayerData) => number | boolean;
	threshold: number;
};

export const challengeReward = {
	easy: 150,
	normal: 250,
	hard: 500
} as const;

/** Map for O(1) challenge lookup by ID */
export const challengeDetailsMap = new Map<string, ChallengeDetails>();

export const challengesDetails = [
	{
		id: 'daily-takedown-spree-1',
		title: 'Takedown Spree I',
		description: 'Get a combined 30 total of kills and assists across all matches.',
		category: 'combat',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.kills + player.assists,
		threshold: 30
	},
	{
		id: 'daily-unforgiven-1',
		title: 'Unforgiven I',
		description: 'Play carefully and win a game with 6 or fewer total deaths.',
		category: 'wins',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.win && player.deaths <= 6,
		threshold: 1
	},
	{
		id: 'daily-victorious-1',
		title: 'Victorious I',
		description: 'Secure victory in 2 matchmade games.',
		category: 'wins',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.win,
		threshold: 2
	},
	{
		id: 'daily-dragon-slayer',
		title: 'Dragon Slayer',
		description: 'Be present for two dragon takedowns in one game.',
		category: 'objectives',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.challenges.dragonTakedowns >= 2,
		threshold: 1
	},
	{
		id: 'daily-dragon-rush',
		title: 'Dragon Rush',
		description: "Secure or assist in killing a dragon before 6'th minute",
		category: 'objectives',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) =>
			player.challenges.earliestDragonTakedown
				? player.challenges.earliestDragonTakedown < 6 * 60
				: 0,
		threshold: 1
	},
	{
		id: 'daily-demolition',
		title: 'Demolition',
		description: 'Secure or assist in destroying 3 turrets in a single match.',
		category: 'objectives',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.challenges.turretTakedowns >= 3,
		threshold: 1
	},
	{
		id: 'daily-triple-threat',
		title: 'Triple Threat',
		description: 'Get tripple-kill in a single game.',
		category: 'combat',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.tripleKills >= 1,
		threshold: 1
	},
	{
		id: 'daily-annihilator-1',
		title: 'Annihilator I',
		description: 'Deal 30,000 damage to enemy champions in a single game.',
		category: 'combat',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.totalDamageDealtToChampions >= 30000,
		threshold: 1
	},
	{
		id: 'daily-annihilator-2',
		title: 'Annihilator II',
		description: 'Deal 50,000 damage to enemy champions in a single game.',
		category: 'combat',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.totalDamageDealtToChampions >= 50000,
		threshold: 1
	},
	{
		id: 'daily-annihilator-3',
		title: 'Annihilator III',
		description: 'Deal 75,000 damage to enemy champions in a single game.',
		category: 'combat',
		mode: 'daily',
		difficulty: 'hard',
		fn: (player) => player.totalDamageDealtToChampions >= 75000,
		threshold: 1
	},
	{
		id: 'daily-immortal',
		title: 'Immortal',
		description: 'Win a match without dying.',
		category: 'wins',
		mode: 'daily',
		difficulty: 'hard',
		fn: (player) => player.deaths === 0,
		threshold: 1
	},
	{
		id: 'daily-last-hit-master-1',
		title: 'Last Hit Master I',
		description: 'Get 100 or more creep score across all matches.',
		category: 'economy',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.totalMinionsKilled,
		threshold: 100
	},
	{
		id: 'daily-last-hit-master-2',
		title: 'Last Hit Master II',
		description: 'Get 200 or more creep score across all matches.',
		category: 'economy',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.totalMinionsKilled,
		threshold: 200
	},
	{
		id: 'daily-ward-master',
		title: 'Ward Master',
		description: 'Place 10 control wards across all matches.',
		category: 'vision',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.challenges.controlWardsPlaced,
		threshold: 10
	},
	{
		id: 'daily-map-control-1',
		title: 'Map Control I',
		description: 'Get 30 or more vision score across all matches.',
		category: 'vision',
		mode: 'daily',
		difficulty: 'easy',
		fn: (player) => player.visionScore,
		threshold: 30
	},
	{
		id: 'daily-map-control-2',
		title: 'Map Control II',
		description: 'Get 60 or more vision score across all matches.',
		category: 'vision',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.visionScore,
		threshold: 60
	},
	{
		id: 'daily-map-control-3',
		title: 'Map Control III',
		description: 'Get 100 or more vision score across all matches.',
		category: 'vision',
		mode: 'daily',
		difficulty: 'hard',
		fn: (player) => player.visionScore,
		threshold: 100
	},
	{
		id: 'daily-bank-breaker',
		title: 'Bank Breaker',
		description: 'Earn 10,000 gold or more in a single game.',
		category: 'economy',
		mode: 'daily',
		difficulty: 'normal',
		fn: (player) => player.goldEarned >= 10000,
		threshold: 1
	},
	{
		id: 'weekly-takedown-spree-1',
		title: 'Takedown Spree I',
		description: 'Score 100 kills and assists across all matches.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.kills + player.assists,
		threshold: 100
	},
	{
		id: 'weekly-takedown-spree-2',
		title: 'Takedown Spree II',
		description: 'Score 200 kills and assists across all matches.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.kills + player.assists,
		threshold: 200
	},
	{
		id: 'weekly-takedown-spree-3',
		title: 'Takedown Spree III',
		description: 'Score 300 kills and assists across all matches.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'hard',
		fn: (player) => player.kills + player.assists,
		threshold: 300
	},
	{
		id: 'weekly-unforgiven',
		title: 'Unforgiven',
		description: 'Play carefully and win 5 games with 6 or fewer total deaths.',
		category: 'wins',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.win && player.deaths <= 6,
		threshold: 5
	},
	{
		id: 'weekly-pentakiller',
		title: 'Pentakiller',
		description: 'Eliminate all 5 enemy champions in a single team fight.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'hard',
		fn: (player) => player.pentaKills >= 1,
		threshold: 1
	},
	{
		id: 'weekly-victorious-1',
		title: 'Victorious I',
		description: 'Secure victory in 5 matchmade games.',
		category: 'wins',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.win,
		threshold: 5
	},
	{
		id: 'weekly-victorious-2',
		title: 'Victorious II',
		description: 'Secure victory in 8 matchmade games.',
		category: 'wins',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.win,
		threshold: 8
	},
	{
		id: 'weekly-victorious-3',
		title: 'Victorious III',
		description: 'Secure victory in 15 matchmade games.',
		category: 'wins',
		mode: 'weekly',
		difficulty: 'hard',
		fn: (player) => player.win,
		threshold: 15
	},
	{
		id: 'weekly-objective-hunter',
		title: 'Objective Hunter',
		description: 'Get 25 combined takedowns on dragons, barons, and turrets.',
		category: 'objectives',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) =>
			(player.challenges.dragonTakedowns || 0) +
			(player.challenges.baronTakedowns || 0) +
			(player.challenges.turretTakedowns || 0),
		threshold: 25
	},
	{
		id: 'weekly-annihilator-1',
		title: 'Annihilator I',
		description: 'Accumulate 200,000 damage dealt to enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.totalDamageDealtToChampions,
		threshold: 200000
	},
	{
		id: 'weekly-annihilator-2',
		title: 'Annihilator II',
		description: 'Accumulate 300,000 damage dealt to enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.totalDamageDealtToChampions,
		threshold: 300000
	},
	{
		id: 'weekly-annihilator-3',
		title: 'Annihilator III',
		description: 'Accumulate 500,000 damage dealt to enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'hard',
		fn: (player) => player.totalDamageDealtToChampions,
		threshold: 500000
	},
	{
		id: 'weekly-last-hit-master-1',
		title: 'Last Hit Master I',
		description: 'Get 700 or more creep score across all matches.',
		category: 'economy',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.totalMinionsKilled,
		threshold: 700
	},
	{
		id: 'weekly-last-hit-master-2',
		title: 'Last Hit Master II',
		description: 'Get 1,000 or more creep score across all matches.',
		category: 'economy',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.totalMinionsKilled,
		threshold: 1000
	},
	{
		id: 'weekly-executioner-1',
		title: 'Executioner I',
		description: 'Eliminate 50 enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.kills,
		threshold: 50
	},
	{
		id: 'weekly-executioner-2',
		title: 'Executioner II',
		description: 'Eliminate 100 enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.kills,
		threshold: 100
	},
	{
		id: 'weekly-executioner-3',
		title: 'Executioner III',
		description: 'Eliminate 200 enemy champions across the week.',
		category: 'combat',
		mode: 'weekly',
		difficulty: 'hard',
		fn: (player) => player.kills,
		threshold: 200
	},
	{
		id: 'weekly-vision-warrior',
		title: 'Vision Warrior',
		description: 'Place 80 stealth wards across all matches.',
		category: 'vision',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.challenges.stealthWardsPlaced,
		threshold: 80
	},
	{
		id: 'weekly-wealth-accumulator-1',
		title: 'Wealth Accumulator I',
		description: 'Earn 50,000 gold across all matches.',
		category: 'economy',
		mode: 'weekly',
		difficulty: 'easy',
		fn: (player) => player.goldEarned,
		threshold: 50000
	},
	{
		id: 'weekly-wealth-accumulator-2',
		title: 'Wealth Accumulator II',
		description: 'Earn 100,000 gold across all matches.',
		category: 'economy',
		mode: 'weekly',
		difficulty: 'normal',
		fn: (player) => player.goldEarned,
		threshold: 100000
	}
] as const satisfies readonly ChallengeDetails[];

// Populate the challenge details map for O(1) lookups
challengesDetails.forEach((challenge) => {
	challengeDetailsMap.set(challenge.id, challenge);
});
