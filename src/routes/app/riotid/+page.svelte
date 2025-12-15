<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import { PLATFORMS } from '$lib/types/riotTypes';
</script>

<form method="POST" use:enhance>
	<div class="flex flex-col items-center gap-2 divide-y divide-zinc-700 bg-zinc-800 p-4 shadow-lg">
		<h1 class="py-6 text-center text-xl">Connect your existing<br /> League of Legends summoner</h1>
		{#if page.form?.errors}
			<div class="flex flex-col p-2 text-red-400">
				{#each page.form.errors as error}
					<span>{error}</span>
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
