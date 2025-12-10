<script lang="ts">
	import { Button } from 'bits-ui';

	let { children, ...props }: Button.RootProps = $props();
</script>

<Button.Root
	class="cursor-pointer rounded-2xl border border-zinc-300 bg-transparent p-1 px-2 text-xs uppercase hover:bg-ocean-700"
	{...props}
>
	{#if children}
		{@render children?.()}
	{:else}
		Button
	{/if}
</Button.Root>
