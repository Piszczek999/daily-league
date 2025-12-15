import { RIOT_API_KEY } from '$env/static/private';
import type {
	Platform,
	Region,
	RiotAccount,
	RiotActiveRegion,
	RiotMatch,
	RiotSummoner
} from '$lib/types/riotTypes';

// Configuration constants
const BASE_URL = 'api.riotgames.com';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

// Custom error class for better error handling
class RiotApiError extends Error {
	constructor(
		public status: number,
		public statusText: string,
		message?: string
	) {
		super(message || `Riot API Error: ${status} ${statusText}`);
		this.name = 'RiotApiError';
	}
}

// Rate limiting helper (optional but recommended)
class RateLimiter {
	private queue: Array<() => Promise<void>> = [];
	private processing = false;

	async add<T>(fn: () => Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.queue.push(async () => {
				try {
					const result = await fn();
					resolve(result);
				} catch (error) {
					reject(error);
				}
			});
			this.process();
		});
	}

	private async process() {
		if (this.processing || this.queue.length === 0) return;

		this.processing = true;
		const task = this.queue.shift();
		if (task) await task();
		this.processing = false;

		if (this.queue.length > 0) this.process();
	}
}

const rateLimiter = new RateLimiter();

/**
 * Generic fetch wrapper for Riot API calls
 * @param prefix - Platform or region identifier
 * @param path - API endpoint path
 * @param options - Additional fetch options
 * @returns Parsed JSON response or null for 404s
 * @throws {RiotApiError} For API errors
 */
async function riotFetch<T>(
	prefix: Platform | Region,
	path: string,
	options: RequestInit = {}
): Promise<T | null> {
	return rateLimiter.add(async () => {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

		try {
			const url = `https://${prefix}.${BASE_URL}${path}`;

			const response = await fetch(url, {
				...options,
				headers: {
					'X-Riot-Token': RIOT_API_KEY,
					...options.headers
				},
				signal: controller.signal
			});

			if (!response.ok) {
				if (response.status === 404) {
					return null;
				}

				// Include response body for better debugging
				let errorMessage = '';
				try {
					const errorData = await response.json();
					errorMessage = errorData.message || JSON.stringify(errorData);
				} catch {
					// Ignore JSON parse errors
				}

				throw new RiotApiError(response.status, response.statusText, errorMessage || undefined);
			}

			const data = await response.json();
			return data as T;
		} catch (error) {
			if (error instanceof RiotApiError) {
				console.error(`Riot API Error [${error.status}]:`, error.message);
				throw error;
			}

			if (error instanceof Error && error.name === 'AbortError') {
				console.error('Riot API request timed out');
				throw new Error('Request timed out');
			}

			console.error('Unexpected error in Riot API call:', error);
			throw error;
		} finally {
			clearTimeout(timeoutId);
		}
	});
}

/**
 * Get the active region for a player by PUUID
 * @param puuid - Player Universally Unique Identifier
 * @param game - Game identifier (default: 'lol')
 */
async function getActiveRegion(
	puuid: string,
	game: string = 'lol'
): Promise<RiotActiveRegion | null> {
	return riotFetch<RiotActiveRegion>(
		'europe',
		`/riot/account/v1/region/by-game/${game}/by-puuid/${puuid}`
	);
}

/**
 * Get account information by PUUID
 * @param puuid - Player Universally Unique Identifier
 */
async function getAccountByPuuid(puuid: string): Promise<RiotAccount | null> {
	return riotFetch<RiotAccount>('europe', `/riot/account/v1/accounts/by-puuid/${puuid}`);
}

/**
 * Get account information by Riot ID
 * @param gameName - In-game name
 * @param tagLine - Tag line (e.g., "NA1")
 */
async function getAccountByRiotId(gameName: string, tagLine: string): Promise<RiotAccount | null> {
	// URL encode parameters to handle special characters
	const encodedGameName = encodeURIComponent(gameName);
	const encodedTagLine = encodeURIComponent(tagLine);

	return riotFetch<RiotAccount>(
		'europe',
		`/riot/account/v1/accounts/by-riot-id/${encodedGameName}/${encodedTagLine}`
	);
}

/**
 * Get detailed match information
 * @param matchId - Match identifier
 * @param region - Regional routing value
 */
async function getMatch(matchId: string, region: Region): Promise<RiotMatch | null> {
	return riotFetch<RiotMatch>(region, `/lol/match/v5/matches/${matchId}`);
}

/**
 * Get list of match IDs for a player
 * @param puuid - Player's universally unique identifier.
 * @param region - Regional routing value used for the API request.
 * @param options - Optional filters and pagination options.
 * @param options.count - Maximum number of matches to retrieve.
 * @param options.start - Index of the first match to return (pagination).
 * @param options.type - Filter by match type.
 * @param options.queue - Filter by specific queue ID.
 * @param options.startTime - Start of time range (epoch seconds).
 * @param options.endTime - End of time range (epoch seconds).
 */
async function getListOfMatchIds(
	puuid: string,
	region: Region,
	options?: {
		count?: number;
		start?: number;
		type?: 'ranked' | 'normal' | 'tourney' | 'tutorial';
		queue?: number;
		startTime?: number;
		endTime?: number;
	}
): Promise<string[] | null> {
	const params = new URLSearchParams();
	if (options?.count !== undefined) params.append('count', options.count.toString());
	if (options?.start !== undefined) params.append('start', options.start.toString());
	if (options?.type !== undefined) params.append('type', options.type.toString());
	if (options?.queue !== undefined) params.append('queue', options.queue.toString());
	if (options?.endTime !== undefined) params.append('endTime', options.endTime.toString());
	if (options?.startTime !== undefined) params.append('startTime', options.startTime.toString());

	const queryString = params.toString();
	const path = `/lol/match/v5/matches/by-puuid/${puuid}/ids${queryString ? `?${queryString}` : ''}`;

	return riotFetch<string[]>(region, path);
}

/**
 * Get summoner information by PUUID
 * @param puuid - Player Universally Unique Identifier
 * @param platform - Platform routing value
 */
async function getSummoner(puuid: string, platform: Platform): Promise<RiotSummoner | null> {
	return riotFetch<RiotSummoner>(platform, `/lol/summoner/v4/summoners/by-puuid/${puuid}`);
}

// Export with better structure
export const riotApi = {
	getSummoner,
	getListOfMatchIds,
	getMatch,
	getAccountByPuuid,
	getAccountByRiotId,
	getActiveRegion
} as const;

export default riotApi;

export { RiotApiError };
