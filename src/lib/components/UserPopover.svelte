<script lang="ts">
	import { Separator, type WithoutChildrenOrChild } from 'bits-ui';
	import { Popover } from 'bits-ui';
	import { fly, slide } from 'svelte/transition';
	import UserAvatar from './UserAvatar.svelte';
	import Button from './Button.svelte';
	import type { User } from '@auth/sveltekit';
	import { signOut } from '@auth/sveltekit/client';

	type Props = WithoutChildrenOrChild<Popover.ContentProps> & {
		user: User;
		src: string | undefined | null;
		alt: string;
		avatarRef?: HTMLElement | null;
	};

	let {
		user,
		src,
		alt,
		ref = $bindable(null),
		avatarRef = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		<UserAvatar {src} {alt} bind:ref={avatarRef} />
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
							<!-- Buttons -->
							<div class="flex flex-col py-2 text-sm">
								<button onclick={() => signOut()} class="cursor-pointer p-1 hover:bg-zinc-700"
									>Sign Out</button
								>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
