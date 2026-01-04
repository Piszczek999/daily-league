<script lang="ts">
	import { LoaderCircle } from "@lucide/svelte";
	import { getLeaderboard } from "../user.remote";
	import UserAvatar from "$lib/components/UserAvatar.svelte";
</script>

<div class="flex w-full flex-col items-center gap-6">
	<div
		class="mb-16 flex w-full flex-col gap-8 rounded-2xl p-6 shadow-glow-sm/50 shadow-amber-300 sm:max-w-lg"
	>
		<h1 class="border-b border-amber-400 pb-4 text-center text-xl font-semibold">Leaderboard</h1>

		{#await getLeaderboard()}
			<div class="flex justify-center py-10">
				<LoaderCircle class="h-6 w-6 animate-spin text-zinc-400" />
			</div>
		{:then users}
			<ul class="flex flex-col gap-2">
				{#each users as user, index}
					<li
						class="flex items-center gap-4 rounded-xl bg-zinc-900 px-4 py-3 transition hover:bg-zinc-800"
					>
						<!-- Rank -->
						<span
							class="w-6 text-center font-semibold
								{index === 0
								? 'text-yellow-400'
								: index === 1
									? 'text-zinc-300'
									: index === 2
										? 'text-amber-600'
										: 'text-zinc-500'}"
						>
							#{index + 1}
						</span>

						<!-- Avatar -->
						<UserAvatar
							src="https://ddragon.leagueoflegends.com/cdn/15.24.1/img/profileicon/{user.profileIconId}.png"
							class="h-10 w-10 rounded-full"
						/>

						<!-- Username -->
						<div class="flex flex-col">
							<span class="leading-tight font-medium">
								{user.gameName}
								<span class="text-zinc-400">#{user.tagLine}</span>
							</span>
						</div>

						<!-- Level -->
						<span class="ml-auto text-sm text-zinc-400">
							Lvl <span class="text-xl font-semibold text-zinc-200">{user.level}</span>
						</span>
					</li>
				{/each}
			</ul>
		{:catch error}
			<p class="py-6 text-center text-sm text-red-400">Failed to load leaderboard</p>
		{/await}
	</div>
</div>
