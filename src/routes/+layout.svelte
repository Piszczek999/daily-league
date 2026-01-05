<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";
	import { Tooltip } from "bits-ui";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
