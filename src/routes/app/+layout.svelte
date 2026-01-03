<script lang="ts">
	import LevelProgressBar from "$lib/components/LevelProgressBar.svelte";
	import UserPopover from "$lib/components/UserPopover.svelte";

	const { children } = $props();
</script>

<nav class="absolute top-0 flex w-full items-center justify-between gap-4 p-4 px-8">
	<div class="text-2xl">
		<a href="/">Daily League</a>
	</div>
	<div class="flex items-center gap-4 rounded-full p-2 shadow-glow shadow-white">
		<LevelProgressBar />
		<UserPopover />
	</div>
</nav>

<main class="flex-center min-h-screen flex-col pt-16">
	{@render children()}
</main>
