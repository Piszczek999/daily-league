export interface RiotMatch {
	metadata: RiotMatchMetadata;
	info: RiotMatchInfo;
}

export interface RiotMatchMetadata {
	dataVersion: string;
	matchId: string;
	participants: string[];
}

export interface RiotMatchInfo {
	endOfGameResult: string;
	gameCreation: number;
	gameDuration: number;
	gameEndTimestamp: number;
	gameId: number;
	gameMode: string;
	gameName: string;
	gameStartTimestamp: number;
	gameType: string;
	gameVersion: string;
	mapId: number;
	participants: RiotPlayerData[];
	platformId: string;
	queueId: number;
	teams: RiotTeamInfo[];
	tournamentCode: string;
}

export interface RiotTeamInfo {
	teamId: 100 | 200;
	win: boolean;
	bans: RiotBan[];
	feats: RiotTeamFeats;
	objectives: RiotTeamObjectives;
}

export interface RiotBan {
	championId: number;
	pickTurn: number;
}

export interface RiotTeamFeats {
	EPIC_MONSTER_KILL: RiotFeatState;
	FIRST_BLOOD: RiotFeatState;
	FIRST_TURRET: RiotFeatState;
}

export interface RiotFeatState {
	featState: number;
}

export interface RiotTeamObjectives {
	atakhan: RiotObjective;
	baron: RiotObjective;
	champion: RiotObjective;
	dragon: RiotObjective;
	horde: RiotObjective;
	inhibitor: RiotObjective;
	riftHerald: RiotObjective;
	tower: RiotObjective;
}

export interface RiotObjective {
	first: boolean;
	kills: number;
}

export interface RiotPlayerData {
	PlayerScore0: number;
	PlayerScore1: number;
	PlayerScore2: number;
	PlayerScore3: number;
	PlayerScore4: number;
	PlayerScore5: number;
	PlayerScore6: number;
	PlayerScore7: number;
	PlayerScore8: number;
	PlayerScore9: number;
	PlayerScore10: number;
	PlayerScore11: number;

	allInPings: number;
	assistMePings: number;
	assists: number;
	baronKills: number;
	basicPings: number;

	challenges: RiotChallenges;

	champExperience: number;
	champLevel: number;
	championId: number;
	championName: string;
	championTransform: number;

	commandPings: number;
	consumablesPurchased: number;
	damageDealtToBuildings: number;
	damageDealtToEpicMonsters: number;
	damageDealtToObjectives: number;
	damageDealtToTurrets: number;
	damageSelfMitigated: number;

	dangerPings: number;
	deaths: number;
	detectorWardsPlaced: number;
	doubleKills: number;
	dragonKills: number;

	eligibleForProgression: boolean;

	enemyMissingPings: number;
	enemyVisionPings: number;

	firstBloodAssist: boolean;
	firstBloodKill: boolean;
	firstTowerAssist: boolean;
	firstTowerKill: boolean;

	gameEndedInEarlySurrender: boolean;
	gameEndedInSurrender: boolean;

	getBackPings: number;

	goldEarned: number;
	goldSpent: number;

	holdPings: number;

	individualPosition: string;

	inhibitorKills: number;
	inhibitorTakedowns: number;
	inhibitorsLost: number;

	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;

	itemsPurchased: number;

	killingSprees: number;
	kills: number;

	lane: string;

	largestCriticalStrike: number;
	largestKillingSpree: number;
	largestMultiKill: number;

	longestTimeSpentLiving: number;

	magicDamageDealt: number;
	magicDamageDealtToChampions: number;
	magicDamageTaken: number;

	missions: Record<string, number>;

	needVisionPings: number;
	neutralMinionsKilled: number;

	nexusKills: number;
	nexusLost: number;
	nexusTakedowns: number;

	objectivesStolen: number;
	objectivesStolenAssists: number;

	onMyWayPings: number;

	participantId: number;
	pentaKills: number;

	perks: RiotPerks;

	physicalDamageDealt: number;
	physicalDamageDealtToChampions: number;
	physicalDamageTaken: number;

	placement: number;

	playerAugment1: number;
	playerAugment2: number;
	playerAugment3: number;
	playerAugment4: number;
	playerAugment5: number;
	playerAugment6: number;

	playerSubteamId: number;

	profileIcon: number;

	pushPings: number;

	puuid: string;

	quadraKills: number;

	retreatPings: number;

	riotIdGameName: string;
	riotIdTagline: string;

	role: string;

	sightWardsBoughtInGame: number;

	spell1Casts: number;
	spell2Casts: number;
	spell3Casts: number;
	spell4Casts: number;

	subteamPlacement: number;

	summoner1Casts: number;
	summoner1Id: number;
	summoner2Casts: number;
	summoner2Id: number;

	summonerId: string;
	summonerLevel: number;
	summonerName: string;

	teamEarlySurrendered: boolean;
	teamId: number;
	teamPosition: string;

	timeCCingOthers: number;
	timePlayed: number;

	totalAllyJungleMinionsKilled: number;
	totalDamageDealt: number;
	totalDamageDealtToChampions: number;
	totalDamageShieldedOnTeammates: number;
	totalDamageTaken: number;
	totalEnemyJungleMinionsKilled: number;
	totalHeal: number;
	totalHealsOnTeammates: number;
	totalMinionsKilled: number;
	totalTimeCCDealt: number;
	totalTimeSpentDead: number;
	totalUnitsHealed: number;

	tripleKills: number;

	trueDamageDealt: number;
	trueDamageDealtToChampions: number;
	trueDamageTaken: number;

	turretKills: number;
	turretTakedowns: number;
	turretsLost: number;

	unrealKills: number;

	visionClearedPings: number;
	visionScore: number;
	visionWardsBoughtInGame: number;

	wardsKilled: number;
	wardsPlaced: number;

	win: boolean;
}

export interface RiotChallenges {
	[key: string]: number | number[] | boolean;
}

export interface RiotPerks {
	statPerks: {
		defense: number;
		flex: number;
		offense: number;
	};
	styles: RiotPerkStyle[];
}

export interface RiotPerkStyle {
	description: string;
	selections: {
		perk: number;
		var1: number;
		var2: number;
		var3: number;
	}[];
	style: number;
}

export const PLATFORMS = [
	'br1',
	'eun1',
	'euw1',
	'jp1',
	'kr',
	'la1',
	'la2',
	'na1',
	'oc1',
	'tr1',
	'ru',
	'ph2',
	'sg2',
	'th2',
	'tw2',
	'vn2'
] as const;

export const REGIONS = ['americas', 'asia', 'europe', 'sea'] as const;

export type Platform = (typeof PLATFORMS)[number];

export type Region = (typeof REGIONS)[number];

export interface RiotAccount {
	puuid: string;
	gameName: string;
	tagLine: string;
}

export interface RiotSummoner {
	profileIconId: number;
	revisionDate: number;
	puuid: string;
	summonerLevel: number;
}

export interface RiotActiveRegion {
	puuid: string;
	game: 'lol' | 'tft';
	region: Platform;
}
