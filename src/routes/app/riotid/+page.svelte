<script>
	import { updateRiotId } from "../user.remote";
	import Button from "$lib/components/Button.svelte";
	import { riotIdSchema } from "$lib/schema";
	import { LoaderCircle } from "@lucide/svelte";
</script>

<form {...updateRiotId.preflight(riotIdSchema)}>
	<div class="flex flex-col items-center gap-2 divide-y divide-zinc-700 bg-zinc-800 p-4 shadow-lg">
		<h1 class="py-6 text-center text-xl">Connect your existing<br /> League of Legends summoner</h1>

		<!-- Issues -->
		{#if updateRiotId.fields.allIssues()}
			<div class="flex flex-col p-2 text-red-400">
				{#each updateRiotId.fields.allIssues() as issue}
					<span>{issue.message}</span>
				{/each}
			</div>
		{/if}

		<div class="py-4 text-lg">
			<input
				{...updateRiotId.fields.gameName.as("text")}
				placeholder="Game Name"
				class="bg-zinc-700 px-4 py-2"
			/>
			<span>#</span>
			<input
				{...updateRiotId.fields.tagLine.as("text")}
				placeholder="Tag"
				class="bg-zinc-700 px-4 py-2"
				size="5"
				maxlength="5"
			/>
		</div>
		<Button
			size="lg"
			{...updateRiotId.buttonProps}
			pending={!!updateRiotId.pending}
			disabled={!!updateRiotId.pending}
		>
			Enter
		</Button>
	</div>
</form>
