<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import ChallengeList from "$lib/components/ChallengeList.svelte";
	import { challengeDetailsMap } from "$lib/constants/challenges";
	import { getEndOfDay, getEndOfWeek, getTimeLeftInMs, SECOND } from "$lib/helpers.js";
	import { getChallenges, getUser, update } from "./user.remote.js";

	let time = $state(new Date());
	const user = $derived(await getUser());
	const challenges = $derived(await getChallenges());
	const dailyChallenges = $derived(
		challenges.filter((ch) => challengeDetailsMap.get(ch.challengeId)!.mode === "daily")
	);
	const weeklyChallenges = $derived(
		challenges.filter((ch) => challengeDetailsMap.get(ch.challengeId)!.mode === "weekly")
	);

	function getTimeLeftDaily() {
		const timeLeft = getTimeLeftInMs(time, getEndOfDay(user.lastUpdatedAt));

		if (timeLeft === 0) return "Day ended";

		const hours = Math.floor(timeLeft / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return `${hours}h ${minutes}m ${seconds}s`;
	}

	function getTimeLeftWeekly() {
		const timeLeft = getTimeLeftInMs(time, getEndOfWeek(user.lastUpdatedAt));

		if (timeLeft === 0) return "Week ended";

		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

		return `${days}d ${hours}h ${minutes}m`;
	}

	function getUpdateTimeLeft() {
		const timeLeft = getTimeLeftInMs(time, SECOND * 10 + user.lastUpdatedAt);

		if (timeLeft === 0) return "update";

		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return `${minutes}m ${seconds}s`;
	}

	function isButtonDisabled() {
		return update.pending !== 0 || getTimeLeftInMs(time, SECOND * 10 + user.lastUpdatedAt) > 0;
	}

	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex w-full flex-col items-center gap-6">
	<div
		class="flex w-full flex-col items-center justify-center gap-8 xl:max-w-6xl xl:flex-row xl:items-start xl:justify-between"
	>
		<div class="flex flex-col gap-6">
			<h1 class="text-center">Daily Challenges</h1>
			<ChallengeList
				challenges={dailyChallenges}
				fallback="No Challenges available. Please click 'update' button"
			/>
			<span class="text-center text-zinc-400">Time Left: {getTimeLeftDaily()}</span>
		</div>

		<div class="flex flex-col gap-6">
			<h1 class="text-center">Weekly Challenges</h1>
			<ChallengeList
				challenges={weeklyChallenges}
				fallback="No Challenges available. Please click 'update' button"
			/>
			<span class="text-center text-zinc-400">Time Left: {getTimeLeftWeekly()}</span>
		</div>
	</div>
	<Button class="mt-10" disabled={isButtonDisabled()} onclick={async () => await update()}
		>{getUpdateTimeLeft()}</Button
	>
</div>
