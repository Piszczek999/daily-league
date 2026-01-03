<script lang="ts">
	import { Trophy, Zap, Target, Users, ArrowRight } from "@lucide/svelte";
</script>

<div class="min-h-screen overflow-hidden bg-linear-to-b from-zinc-900 to-black text-white">
	<!-- Hero Section -->
	<section class="px-8 py-28 text-center">
		<div class="mx-auto max-w-4xl space-y-8">
			<h1
				class="bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-6xl font-bold text-transparent"
			>
				Master Your League
			</h1>
			<p class="text-2xl text-zinc-300">
				Complete daily and weekly challenges to earn XP, unlock higher levels, and compete with
				other players on the global leaderboard.
			</p>
			<div class="flex justify-center gap-4 pt-8">
				<a
					href="/app"
					class="flex items-center gap-2 bg-white px-8 py-3 text-lg font-semibold text-zinc-900 transition-colors hover:bg-zinc-300"
				>
					Go to App <ArrowRight size={20} />
				</a>
				<a
					href="#features"
					class="border border-zinc-600 px-8 py-3 font-semibold transition-colors hover:border-zinc-400"
				>
					Learn More
				</a>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="bg-zinc-900/50 px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-16 text-center text-4xl font-bold">Why DailyLeague?</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<!-- Feature 1 -->
				<div
					class="space-y-4 border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500"
				>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
						<Zap size={24} />
					</div>
					<h3 class="text-xl font-bold">Daily Challenges</h3>
					<p class="text-zinc-400">
						New challenges every day to keep you engaged and constantly improving your gameplay.
					</p>
				</div>

				<!-- Feature 2 -->
				<div
					class="space-y-4 border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500"
				>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
						<Target size={24} />
					</div>
					<h3 class="text-xl font-bold">Weekly Goals</h3>
					<p class="text-zinc-400">
						Complete weekly objectives to unlock exclusive rewards and track your progress over
						time.
					</p>
				</div>

				<!-- Feature 3 -->
				<div
					class="space-y-4 border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500"
				>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
						<Trophy size={24} />
					</div>
					<h3 class="text-xl font-bold">Earn XP & Level Up</h3>
					<p class="text-zinc-400">
						Gain XP from every completed challenge to unlock higher levels and showcase your
						progression.
					</p>
				</div>

				<!-- Feature 4 -->
				<div
					class="space-y-4 border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500"
				>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
						<Users size={24} />
					</div>
					<h3 class="text-xl font-bold">Compete & Rank</h3>
					<p class="text-zinc-400">
						Climb the global leaderboard and compete against thousands of other League of Legends
						players worldwide.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Challenge Categories Section -->
	<section class="px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-16 text-center text-4xl font-bold">Challenge Categories</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each [{ title: "Combat", desc: "Master teamfights and 1v1 scenarios" }, { title: "Vision Control", desc: "Improve warding and map awareness" }, { title: "Objectives", desc: "Focus on turrets, dragons, and Baron" }, { title: "Economy", desc: "Optimize farming and gold generation" }, { title: "Macro Play", desc: "Enhance map rotations and timings" }, { title: "Champion Mastery", desc: "Deepen your champion pool knowledge" }] as category}
					<div
						class="border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-purple-500"
					>
						<h3 class="mb-2 text-xl font-bold">{category.title}</h3>
						<p class="text-zinc-400">{category.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-linear-to-r from-zinc-800 to-zinc-900 px-8 py-20">
		<div class="mx-auto max-w-4xl space-y-8 text-center">
			<h2 class="text-4xl font-bold">Start Your Climb</h2>
			<p class="text-xl text-zinc-300">
				Complete challenges, earn XP, unlock levels, and dominate the leaderboards. Your journey
				starts now.
			</p>
			<a
				href="/sign-in"
				class="inline-block bg-white px-8 py-3 text-lg font-semibold text-zinc-900 transition-colors hover:bg-zinc-300"
			>
				Sign Up Now
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-zinc-800 px-8 py-12 text-center text-zinc-400">
		<p>&copy; 2025 DailyLeague. A League of Legends challenge tracker.</p>
	</footer>
</div>
