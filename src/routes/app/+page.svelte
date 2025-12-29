<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ChallengeList from '$lib/components/ChallengeList.svelte';
	import { challengeDetailsMap } from '$lib/constants/challenges';
	import { getEndOfDay, getEndOfWeek, getTimeLeftInMs, SECOND } from '$lib/helpers.js';
	import { getChallenges, getUser, update } from './user.remote.js';

	let time = $state(new Date());
	let user = $derived(getUser());

	function getTimeLeftDaily() {
		const timeLeft = getTimeLeftInMs(time, getEndOfDay());

		if (timeLeft === 0) return 'Day ended';

		const hours = Math.floor(timeLeft / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return `${hours}h ${minutes}m ${seconds}s`;
	}

	function getTimeLeftWeekly() {
		const timeLeft = getTimeLeftInMs(time, getEndOfWeek());

		if (timeLeft === 0) return 'Week ended';

		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

		return `${days}d ${hours}h ${minutes}m`;
	}

	function getUpdateTimeLeft() {
		if (!user.current || !user.current.puuid) return 0;
		const timeLeft = getTimeLeftInMs(time, SECOND * 10 + user.current.lastUpdatedAt);

		if (timeLeft === 0) return 'update';

		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return `${minutes}m ${seconds}s`;
	}

	function isButtonDisabled() {
		if (!user.current || !user.current.puuid) return true;
		return (
			update.pending !== 0 || getTimeLeftInMs(time, SECOND * 10 + user.current.lastUpdatedAt) > 0
		);
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
		{#await getChallenges()}
			<p class="text-center">Loading challenges...</p>
		{:then challenges}
			{@const dailyChallenges = challenges.filter(
				(ch) => challengeDetailsMap.get(ch.challengeId)!.mode === 'daily'
			)}
			{@const weeklyChallenges = challenges.filter(
				(ch) => challengeDetailsMap.get(ch.challengeId)!.mode === 'weekly'
			)}

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
		{:catch error}
			<p>Failed to load challenges: {error}</p>
		{/await}
	</div>
	<Button
		class="mt-10 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={isButtonDisabled()}
		onclick={async () => await update()}>{getUpdateTimeLeft()}</Button
	>
</div>
