<script lang="ts">
	import LevelProgressBar from "$lib/components/LevelProgressBar.svelte";
	import UserPopover from "$lib/components/UserPopover.svelte";
	import icon from "$lib/assets/logo.png";
	import { Trophy } from "@lucide/svelte";

	const { children } = $props();
</script>

<nav
	class="absolute top-0 flex w-full flex-col items-center justify-between gap-4 p-4 px-2 md:flex-row md:px-8"
>
	<div>
		<a href="/app" class="flex items-center gap-2 text-3xl"
			><img src={icon} alt="" class="h-12 w-12 rounded-lg" />Daily League
		</a>
	</div>
	<div class="flex items-center gap-4 rounded-full p-2 shadow-glow-sm shadow-white">
		<LevelProgressBar />
		<UserPopover />
	</div>
</nav>

<main class="flex-center min-h-screen flex-col pt-20">
	{@render children()}
</main>
