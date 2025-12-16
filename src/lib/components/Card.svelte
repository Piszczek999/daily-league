<script lang="ts">
	import { Eye } from '@lucide/svelte';
	import { type BitsPrimitiveDivAttributes, type WithoutChildrenOrChild } from 'bits-ui';

	type CardColor = 'yellow' | 'red' | 'blue' | 'green' | 'purple';
	type Props = WithoutChildrenOrChild<BitsPrimitiveDivAttributes> & {
		title: string;
		description: string;
		color?: CardColor;
	};
	let { class: className, title, description, color = 'yellow', ...props }: Props = $props();

	const colorStyles = {
		yellow: {
			card: 'bg-yellow-500 shadow-yellow-500 border-yellow-600',
			divide: 'divide-yellow-600',
			shadow: 'shadow-yellow-500'
		},
		red: {
			card: 'bg-red-500 shadow-red-500 border-red-600',
			divide: 'divide-red-600',
			shadow: 'shadow-red-500'
		},
		blue: {
			card: 'bg-blue-500 shadow-blue-500 border-blue-600',
			divide: 'divide-blue-600',
			shadow: 'shadow-blue-500'
		},
		green: {
			card: 'bg-green-500 shadow-green-500 border-green-600',
			divide: 'divide-green-600',
			shadow: 'shadow-green-500'
		},
		purple: {
			card: 'bg-purple-500 border-purple-600',
			divide: 'divide-purple-600',
			shadow: 'shadow-purple-500'
		}
	};

	let colors = $derived(colorStyles[color]);
</script>

<div class="relative transform-3d">
	<div class="absolute inset-0 shadow-glow {colors.shadow} m-3 -translate-z-1"></div>

	<div
		class="relative rounded-lg border-4 transition-transform duration-300 ease-out hover:translate-z-5 hover:animate-wiggle {colors.card} {className}"
		{...props}
	>
		<Eye class="absolute top-1/2 left-1/2 size-24 -translate-1/2 text-black opacity-10" />
		<div class="relative {colors.divide} flex h-full flex-col divide-y text-sm text-white">
			<!-- Title -->
			<div class="flex-center p-2">
				<span class="text-center font-bold tracking-wider text-shadow-md">{title}</span>
			</div>
			<!-- Description -->
			<div class="flex-center h-full bg-black/10 p-2">
				<span class="text-center text-shadow-md">{description}</span>
			</div>
			<!-- Progress -->
			<div class="flex-center p-2">
				<span class="text-center text-shadow-md">0/10</span>
			</div>
		</div>
	</div>
</div>
