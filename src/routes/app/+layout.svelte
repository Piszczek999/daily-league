<script lang="ts">
	import UserPopover from '$lib/components/UserPopover.svelte';

	let { children, data } = $props();
	let { user } = $derived(data);
</script>

<nav class="absolute top-0 flex w-full items-center justify-between gap-4 p-4 px-8">
	<div class="text-2xl">
		<a href="/">Daily League</a>
	</div>
	<div class="flex items-center gap-2 rounded-full shadow-glow-lg shadow-white">
		<UserPopover {user} />
	</div>
</nav>

<main class="flex-center h-screen flex-col pt-16">
	{@render children()}
</main>
