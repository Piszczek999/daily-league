import type { Platform } from "@prisma/client";

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
	"12AssistStreakCount": number;
	HealFromMapSources: number;
	InfernalScalePickup: number;
	SWARM_DefeatAatrox: number;
	SWARM_DefeatBriar: number;
	SWARM_DefeatMiniBosses: number;
	SWARM_EvolveWeapon: number;
	SWARM_Have3Passives: number;
	SWARM_KillEnemy: number;
	SWARM_PickupGold: number;
	SWARM_ReachLevel50: number;
	SWARM_Survive15Min: number;
	SWARM_WinWith5EvolvedWeapons: number;
	abilityUses: number;
	acesBefore15Minutes: number;
	alliedJungleMonsterKills: number;
	baronTakedowns: number;
	blastConeOppositeOpponentCount: number;
	bountyGold: number;
	buffsStolen: number;
	completeSupportQuestInTime: number;
	controlWardsPlaced: number;
	damagePerMinute: number;
	damageTakenOnTeamPercentage: number;
	dancedWithRiftHerald: number;
	deathsByEnemyChamps: number;
	dodgeSkillShotsSmallWindow: number;
	doubleAces: number;
	dragonTakedowns: number;
	earliestDragonTakedown?: number;
	earliestBaron?: number;
	earlyLaningPhaseGoldExpAdvantage?: number;
	effectiveHealAndShielding: number;
	elderDragonKillsWithOpposingSoul: number;
	elderDragonMultikills: number;
	enemyChampionImmobilizations: number;
	enemyJungleMonsterKills: number;
	epicMonsterKillsNearEnemyJungler: number;
	epicMonsterKillsWithin30SecondsOfSpawn: number;
	epicMonsterSteals: number;
	epicMonsterStolenWithoutSmite: number;
	firstTurretKilled: number;
	firstTurretKilledTime?: number;
	fistBumpParticipation: number;
	flawlessAces: number;
	fullTeamTakedown: number;
	gameLength: number;
	getTakedownsInAllLanesEarlyJungleAsLaner: number;
	goldPerMinute: number;
	hadAfkTeammate?: number;
	hadOpenNexus: number;
	immobilizeAndKillWithAlly: number;
	initialBuffCount: number;
	initialCrabCount: number;
	jungleCsBefore10Minutes: number;
	junglerTakedownsNearDamagedEpicMonster: number;
	kTurretsDestroyedBeforePlatesFall: number;
	kda: number;
	killAfterHiddenWithAlly: number;
	killParticipation: number;
	killedChampTookFullTeamDamageSurvived: number;
	killingSprees: number;
	killsNearEnemyTurret: number;
	killsOnOtherLanesEarlyJungleAsLaner: number;
	killsOnRecentlyHealedByAramPack: number;
	killsUnderOwnTurret: number;
	killsWithHelpFromEpicMonster: number;
	knockEnemyIntoTeamAndKill: number;
	landSkillShotsEarlyGame: number;
	laneMinionsFirst10Minutes: number;
	laningPhaseGoldExpAdvantage?: number;
	legendaryCount: number;
	legendaryItemUsed: number[];
	lostAnInhibitor: number;
	maxCsAdvantageOnLaneOpponent?: number;
	maxKillDeficit: number;
	maxLevelLeadLaneOpponent?: number;
	mejaisFullStackInTime: number;
	moreEnemyJungleThanOpponent: number;
	multiKillOneSpell: number;
	multiTurretRiftHeraldCount: number;
	multikills: number;
	multikillsAfterAggressiveFlash: number;
	outerTurretExecutesBefore10Minutes: number;
	outnumberedKills: number;
	outnumberedNexusKill: number;
	perfectDragonSoulsTaken: number;
	perfectGame: number;
	pickKillWithAlly: number;
	playedChampSelectPosition?: number;
	poroExplosions: number;
	quickCleanse: number;
	quickFirstTurret: number;
	quickSoloKills: number;
	riftHeraldTakedowns: number;
	saveAllyFromDeath: number;
	scuttleCrabKills: number;
	shortestTimeToAceFromFirstTakedown?: number;
	skillshotsDodged: number;
	skillshotsHit: number;
	snowballsHit: number;
	soloBaronKills: number;
	soloKills: number;
	stealthWardsPlaced: number;
	survivedSingleDigitHpCount: number;
	survivedThreeImmobilizesInFight: number;
	takedownOnFirstTurret: number;
	takedowns: number;
	takedownsAfterGainingLevelAdvantage: number;
	takedownsBeforeJungleMinionSpawn: number;
	takedownsFirstXMinutes: number;
	takedownsInAlcove: number;
	takedownsInEnemyFountain: number;
	teamBaronKills: number;
	teamDamagePercentage: number;
	teamElderDragonKills: number;
	teamRiftHeraldKills: number;
	teleportTakedowns?: number;
	tookLargeDamageSurvived: number;
	turretPlatesTaken: number;
	turretTakedowns: number;
	turretsTakenWithRiftHerald: number;
	twentyMinionsIn3SecondsCount: number;
	twoWardsOneSweeperCount: number;
	unseenRecalls: number;
	visionScoreAdvantageLaneOpponent?: number;
	visionScorePerMinute: number;
	voidMonsterKill: number;
	wardTakedowns: number;
	wardTakedownsBefore20M: number;
	wardsGuarded: number;
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
	game: "lol" | "tft";
	region: Platform;
}
