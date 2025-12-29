<script>
	import { updateRiotId } from '../user.remote';
	import Button from '$lib/components/Button.svelte';
</script>

<form {...updateRiotId}>
	<div class="flex flex-col items-center gap-2 divide-y divide-zinc-700 bg-zinc-800 p-4 shadow-lg">
		<h1 class="py-6 text-center text-xl">Connect your existing<br /> League of Legends summoner</h1>
		{#if updateRiotId.fields.allIssues()}
			<div class="flex flex-col p-2 text-red-400">
				{#each updateRiotId.fields.allIssues() as issue}
					<span>{issue.message}</span>
				{/each}
			</div>
		{/if}
		<div class="py-4 text-lg">
			<input
				type="text"
				id="gameName"
				name="gameName"
				placeholder="Game Name"
				class="bg-zinc-700 px-4 py-2"
			/>
			<span>#</span>
			<input
				type="text"
				id="tagLine"
				name="tagLine"
				placeholder="Tag"
				class="bg-zinc-700 px-4 py-2"
				size="5"
				maxlength="5"
			/>
		</div>
		<Button type="submit" class="text-2xl">Enter</Button>
	</div>
</form>
