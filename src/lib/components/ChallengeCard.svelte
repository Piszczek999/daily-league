<script lang="ts">
	import { Eye, Swords, Trophy, Brain, Target, Users, Sparkles, HandCoins } from '@lucide/svelte';
	import { Progress, type BitsPrimitiveDivAttributes, type WithoutChildrenOrChild } from 'bits-ui';
	import { challengeReward, challengesDetails } from '$lib/constants/challenges';
	import { claimReward } from '../../routes/app/user.remote';
	import { fly } from 'svelte/transition';
	import type { Challenge } from '@prisma/client';

	type CardSize = 'sm' | 'md' | 'lg' | 'xl';
	type Props = WithoutChildrenOrChild<BitsPrimitiveDivAttributes> & {
		size?: CardSize;
		challenge: Challenge;
		delay?: number;
	};
	let { size = 'md', challenge, delay = 0, ...props }: Props = $props();

	const sizeStyles = {
		sm: { card: 'h-40 w-30', icon: 'size-20' },
		md: { card: 'h-48 w-36', icon: 'size-24' },
		lg: { card: 'h-56 w-42', icon: 'size-28' },
		xl: { card: 'h-64 w-48', icon: 'size-32' }
	};

	const colorStyles = {
		easy: { bg: 'bg-green-500', shadow: 'shadow-green-500' },
		normal: { bg: 'bg-yellow-500', shadow: 'shadow-yellow-500' },
		hard: { bg: 'bg-red-500', shadow: 'shadow-red-500' }
	};

	const categoryIcons = {
		combat: Swords,
		wins: Trophy,
		macro: Brain,
		vision: Eye,
		objectives: Target,
		economy: HandCoins,
		role: Users,
		champion: Sparkles
	};

	let details = $derived(challengesDetails.find((d) => d.id === challenge.challengeId)!);
	let colorClasses = $derived(colorStyles[details.difficulty]);
	let sizeClasses = $derived(sizeStyles[size]);
	let reward = $derived(
		details.mode === 'weekly'
			? challengeReward[details.difficulty] * 3
			: challengeReward[details.difficulty]
	);
	let IconComponent = $derived(categoryIcons[details.category]);
</script>

<div class="relative transform-3d" in:fly|global={{ y: 200, delay }}>
	<div class="absolute inset-0 shadow-glow {colorClasses.shadow} m-3 -translate-z-1 border"></div>

	<div
		class="relative rounded-lg border-4 border-black/20 transition-transform duration-300 ease-out hover:translate-z-5 hover:animate-wiggle {colorClasses.bg} {sizeClasses.card}"
		{...props}
	>
		<IconComponent
			class="absolute top-1/2 left-1/2 {sizeClasses.icon} -translate-1/2 text-black opacity-20"
		/>
		<div class="relative flex h-full flex-col divide-y divide-black/10 text-sm text-white">
			<!-- Title -->
			<div class="flex-center p-2">
				<span class="text-center font-bold tracking-wider text-shadow-md">{details.title}</span>
			</div>
			<!-- Description -->
			<div class="flex-center h-full bg-black/10 p-2">
				<span class="text-center text-shadow-md">{details.description}</span>
			</div>
			<!-- Footer -->
			{#if challenge.collectable}
				<button
					class=" bg-white/10 p-4 px-2 font-bold tracking-wider transition text-shadow-md hover:bg-black/20"
					onclick={async () => await claimReward(challenge.id)}>Collect {reward} XP</button
				>
			{:else}
				<div class="flex justify-between p-2 pb-1 text-xs">
					<span class="text-shadow-md">{challenge.progress}/{details.treshhold}</span>
					<span class="text-shadow-md">{reward} XP</span>
				</div>
			{/if}
			<Progress.Root
				value={challenge.progress}
				max={details.treshhold}
				class="h-1.5 overflow-hidden bg-black opacity-30"
			>
				<div
					class="h-full bg-white"
					style={`transform: translateX(-${100 - (challenge.progress / details.treshhold) * 100}%)`}
				></div>
			</Progress.Root>
		</div>
	</div>
</div>
