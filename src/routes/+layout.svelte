<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Tooltip } from 'bits-ui';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Tooltip.Provider>
	<div data-sveltekit-preload-data="off" data-sveltekit-preload-code="off">
		{@render children()}
	</div>
</Tooltip.Provider>
