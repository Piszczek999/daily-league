<script lang="ts">
	import { getRequiredXp } from '$lib/helpers';
	import { Progress, Tooltip } from 'bits-ui';
	import { getUser } from '../../routes/app/user.remote';

	const user = $derived(await getUser());
</script>

<div class="flex items-center gap-2">
	<!-- Level Badge -->
	<div class="flex items-center gap-2 px-2">
		<span class="text-xs text-zinc-400">LV.</span>
		<span class="text-lg font-bold text-yellow-400">{user.level}</span>
	</div>
	<!-- Progress Section -->
	<Tooltip.Root disableCloseOnTriggerClick delayDuration={100}>
		<Tooltip.Trigger class="flex">
			<Progress.Root
				value={user.xp}
				max={getRequiredXp(user.level)}
				class="h-2 w-28 overflow-hidden rounded-full bg-linear-to-r from-zinc-700 to-zinc-600"
			>
				<div
					class="h-full bg-linear-to-r from-yellow-500 to-yellow-400 transition-all duration-300"
					style={`width: ${(user.xp / getRequiredXp(user.level)) * 100}%`}
				></div>
			</Progress.Root>
		</Tooltip.Trigger>
		<Tooltip.Content
			side="bottom"
			class="inline rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-400"
		>
			<span>{user.xp}/{getRequiredXp(user.level)}</span>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
