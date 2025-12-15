<script lang="ts">
	import { Button, mergeProps } from 'bits-ui';

	let { children, ...props }: Button.RootProps = $props();

	const mergedProps = $derived(
		mergeProps(
			{
				class: 'cursor-pointer border border-zinc-300 bg-transparent p-1 px-2 uppercase'
			},
			props
		)
	);
</script>

<Button.Root {...mergedProps}>
	{#if children}
		{@render children?.()}
	{:else}
		Button
	{/if}
</Button.Root>
