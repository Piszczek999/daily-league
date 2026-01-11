<script lang="ts">
	import type { Challenge } from "@prisma/client";
	import ChallengeCard from "./ChallengeCard.svelte";

	type Props = {
		challenges: Challenge[];
		fallback: string;
	};
	const { challenges, fallback }: Props = $props();
</script>

{#if challenges.length > 0}
	<div class="grid grid-cols-2 gap-4 perspective-near sm:grid-cols-3">
		{#each challenges as challenge, i}
			<ChallengeCard size="lg" {challenge} delay={i * 100} />
		{/each}
	</div>
{:else}
	{fallback}
{/if}
