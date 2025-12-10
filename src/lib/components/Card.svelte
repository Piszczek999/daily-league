<script lang="ts">
	import { Eye } from '@lucide/svelte';
	import { type BitsPrimitiveDivAttributes, type WithoutChildrenOrChild } from 'bits-ui';

	type CardColor = 'yellow' | 'red' | 'blue' | 'green' | 'purple';
	type Props = WithoutChildrenOrChild<BitsPrimitiveDivAttributes> & {
		title: string;
		description: string;
		color?: CardColor;
	};
	let { class: className, title, description, color, ...props }: Props = $props();
</script>

<div
	class="relative rounded-lg border-4 shadow-card transition-all duration-300 ease-out hover:translate-z-10 hover:animate-wiggle bg-{color}-500 shadow-{color}-500 border-{color}-600 {className} "
	{...props}
>
	<Eye class="absolute top-1/2 left-1/2 size-32 -translate-1/2 text-black/10" />
	<div class="divide-{color}-600 flex h-full flex-col divide-y">
		<!-- Title -->
		<div class="flex-center p-2">
			<span class="text-center font-bold tracking-wider text-shadow-md">{title}</span>
		</div>
		<!-- Description -->
		<div class="z-10 flex-center h-full p-2">
			<span class="text-center text-shadow-md">{description}</span>
		</div>
		<!-- Progress -->
		<div class="z-10 flex-center p-2">
			<span class="text-center text-shadow-md">0/10</span>
		</div>
	</div>
</div>
