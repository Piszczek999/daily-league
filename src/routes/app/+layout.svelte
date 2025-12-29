<script lang="ts">
	import UserPopover from '$lib/components/UserPopover.svelte';
	import { getUser } from './user.remote';

	const { children } = $props();
</script>

<nav class="absolute top-0 flex w-full items-center justify-between gap-4 p-4 px-8">
	<div class="text-2xl">
		<a href="/">Daily League</a>
	</div>
	<div class="flex items-center gap-2 rounded-full shadow-glow-lg shadow-white">
		{#await getUser() then user}
			<UserPopover {user} />
		{/await}
	</div>
</nav>

<main class="flex-center min-h-screen flex-col pt-16">
	{@render children()}
</main>
