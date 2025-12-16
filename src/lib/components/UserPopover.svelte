<script lang="ts">
	import { type WithoutChildrenOrChild } from 'bits-ui';
	import { Popover } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import UserAvatar from './UserAvatar.svelte';
	import { signOut } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { getUser } from '$lib/api/user.remote';

	type Props = WithoutChildrenOrChild<Popover.ContentProps> & {
		avatarRef?: HTMLElement | null;
	};

	let { ref = $bindable(null), avatarRef = $bindable(null), ...restProps }: Props = $props();
	let user = await getUser();
</script>

<Popover.Root>
	<Popover.Trigger>
		<UserAvatar
			src={user.puuid
				? `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/profileicon/${user.profileIconId}.png`
				: user.image}
			bind:ref={avatarRef}
		/>
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content forceMount bind:ref {...restProps}>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps} class="px-4 py-2">
						<div
							{...props}
							class="flex min-w-48 flex-col divide-y divide-zinc-700 bg-zinc-800 shadow-lg"
							transition:slide
						>
							<!-- User Details -->
							<div class="flex flex-col px-2 py-4 text-center">
								<span>{user.name}</span>
								<span class="text-xs text-zinc-400">{user.email}</span>
							</div>
							{#if user.puuid}
								<div class="flex justify-center p-2">
									<span>{user.gameName}</span><span class="text-zinc-400">#{user.tagLine}</span>
								</div>
							{/if}
							<!-- Buttons -->
							<div class="flex flex-col py-2 text-sm">
								<button
									onclick={() =>
										signOut({
											fetchOptions: {
												onSuccess: () => {
													goto('/');
												}
											}
										})}
									class="cursor-pointer p-1 hover:bg-zinc-700">Sign Out</button
								>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
