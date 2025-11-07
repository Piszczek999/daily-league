<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { signOut } from '@auth/sveltekit/client';
	import { signIn } from '@auth/sveltekit/client';

	let { children, data }: LayoutProps = $props();
	let session = data.session;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex justify-between gap-4 bg-gray-200 p-4">
	<div>
		<a href="/">Home</a>
		{#if session?.user}
			<a href="/protected">Protected</a>
		{/if}
	</div>
	<div>
		{#if session?.user}
			<p>Welcome {session.user.name}!</p>
			<img src={session.user.image} alt="Profile" />
			<button onclick={() => signOut()}>Sign Out</button>
		{:else}
			<button onclick={() => signIn('github')}>Sign In</button>
		{/if}
	</div>
</nav>

{@render children()}
