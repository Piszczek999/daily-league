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
	const diffToSunday = day === 0 ? 0 : 7 - day;

	date.setDate(date.getDate() + diffToSunday);
	date.setHours(23, 59, 59, 999);

	return date.getTime();
}

export function getRequiredXp(level: number) {
	return 5 * level ** 3 + 50 * level ** 2 + 150 * level;
}
