<script lang="ts">
	import { Avatar, type WithoutChildrenOrChild } from 'bits-ui';

	type Props = WithoutChildrenOrChild<Avatar.RootProps> & {
		src: string | undefined | null;
		alt: string;
		imageRef?: HTMLImageElement | null;
	};

	let {
		src,
		alt,
		ref = $bindable(null),
		imageRef = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<Avatar.Root
	class="flex-center size-8 cursor-pointer overflow-hidden rounded-full border border-stone-600 transition hover:opacity-60"
	{...restProps}
	bind:ref
>
	<Avatar.Image {src} {alt} bind:ref={imageRef} />
</Avatar.Root>
