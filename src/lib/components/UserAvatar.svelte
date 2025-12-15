<script lang="ts">
	import { Avatar, type WithoutChildrenOrChild } from 'bits-ui';

	type Props = WithoutChildrenOrChild<Avatar.RootProps> & {
		src: string | undefined | null;
		imageRef?: HTMLImageElement | null;
	};

	let { src, ref = $bindable(null), imageRef = $bindable(null), ...restProps }: Props = $props();
</script>

<Avatar.Root
	class="flex-center size-8 cursor-pointer overflow-hidden rounded-full border border-stone-600 transition hover:opacity-60"
	{...restProps}
	bind:ref
>
	<Avatar.Image {src} alt="Avatar" bind:ref={imageRef} />
</Avatar.Root>
