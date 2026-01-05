<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import ChallengeList from "$lib/components/ChallengeList.svelte";
	import { challengeDetailsMap } from "$lib/constants/challenges";
	import {
		getEndOfDay,
		getTimeLeftDaily,
		getTimeLeftInMs,
		getTimeLeftWeekly,
		SECOND
	} from "$lib/helpers.js";
	import { Trophy } from "@lucide/svelte";
	import { getChallenges, getUser, update } from "../user.remote.js";

	let time = $state(new Date());
	const user = $derived(await getUser());
	const challenges = $derived(await getChallenges());
	const dailyChallenges = $derived(
		challenges.filter((ch) => challengeDetailsMap.get(ch.challengeId)!.mode === "daily")
	);
	const weeklyChallenges = $derived(
		challenges.filter((ch) => challengeDetailsMap.get(ch.challengeId)!.mode === "weekly")
	);
	const buttonDisabled = $derived(
		update.pending !== 0 || getTimeLeftInMs(time, SECOND * 10 + user.lastUpdatedAt) > 0
	);

	function getUpdateTimeLeft() {
		const timeLeft = getTimeLeftInMs(time, SECOND * 10 + user.lastUpdatedAt);

		if (timeLeft === 0) return "update";

		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return `${minutes}m ${seconds}s`;
	}

	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	let shouldUpdate = $derived(time.getTime() > getEndOfDay(user.lastUpdatedAt));
	$effect(() => {
		if (shouldUpdate) {
			shouldUpdate = false;
			update();
		}
	});
</script>

<div class="flex w-full flex-col items-center gap-6">
	<a
		href="/app/leaderboard"
		class="flex-center gap-2 rounded-full px-4 py-2 text-xl text-amber-200 shadow-glow-sm/80 shadow-amber-200 hover:bg-white/3"
	>
		<Trophy />
		Leaderboard</a
	>
	<div
		class="flex w-full flex-col items-center justify-center gap-8 xl:max-w-6xl xl:flex-row xl:items-start xl:justify-between"
	>
		<div class="flex flex-col gap-6">
			<h1 class="text-center">Daily Challenges</h1>
			<ChallengeList
				challenges={dailyChallenges}
				fallback="No Challenges available. Please click 'update' button"
			/>
			<span class="text-center text-zinc-400"
				>Time Left: {getTimeLeftDaily(time, user.lastUpdatedAt)}</span
			>
		</div>

		<div class="flex flex-col gap-6">
			<h1 class="text-center">Weekly Challenges</h1>
			<ChallengeList
				challenges={weeklyChallenges}
				fallback="No Challenges available. Please click 'update' button"
			/>
			<span class="text-center text-zinc-400"
				>Time Left: {getTimeLeftWeekly(time, user.lastUpdatedAt)}</span
			>
		</div>
	</div>
	<Button
		class="mt-10"
		pending={!!update.pending}
		disabled={buttonDisabled}
		onclick={async () => await update()}
	>
		{#if buttonDisabled}
			{getUpdateTimeLeft()}
		{:else}
			update
		{/if}
	</Button>
</div>
