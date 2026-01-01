import { error } from '@sveltejs/kit';
import type { Platform, Region } from './types/riotTypes';

export function toRegion(platform: Platform): Region {
	const americas: Platform[] = ['na1', 'br1', 'la1', 'la2'];
	const asia: Platform[] = ['kr', 'jp1'];
	const europe: Platform[] = ['eun1', 'euw1', 'tr1', 'ru'];
	const sea: Platform[] = ['oc1', 'sg2', 'tw2', 'vn2'];

	if (americas.includes(platform)) return 'americas';
	if (asia.includes(platform)) return 'asia';
	if (europe.includes(platform)) return 'europe';
	if (sea.includes(platform)) return 'sea';
	error(500, "user's platform not recognized");
}

export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;
export const DAY = 86400000;

export function getTimeLeftInMs(val1: number | Date, val2?: number | Date) {
	const from = val2 === undefined ? new Date() : new Date(val1);
	const to = val2 === undefined ? new Date(val1) : new Date(val2);
	const diff = to.getTime() - from.getTime();
	return Math.max(0, diff);
}

export function getStartOfDay(timestamp?: number | Date) {
	const date = timestamp === undefined ? new Date() : new Date(timestamp);
	date.setHours(0, 0, 0, 0);

	return date.getTime();
}

export function getEndOfDay(timestamp?: number | Date) {
	const date = timestamp === undefined ? new Date() : new Date(timestamp);
	date.setHours(23, 59, 59, 999);

	return date.getTime();
}

export function getStartOfWeek(timestamp?: number | Date) {
	const date = timestamp === undefined ? new Date() : new Date(timestamp);

	const day = date.getDay(); // Sunday = 0, Monday = 1
	const diffToMonday = day === 0 ? -6 : 1 - day;

	date.setDate(date.getDate() + diffToMonday);
	date.setHours(0, 0, 0, 0);

	return date.getTime();
}
export function getEndOfWeek(timestamp?: number | Date) {
	const date = timestamp === undefined ? new Date() : new Date(timestamp);

	const day = date.getDay(); // Sunday = 0, Monday = 1
	const diffToSunday = 7 - day;

	date.setDate(date.getDate() + diffToSunday);
	date.setHours(23, 59, 59, 999);

	return date.getTime();
}

export function getRequiredXp(level: number) {
	return 5 * level ** 3 + 50 * level ** 2 + 150 * level;
}
