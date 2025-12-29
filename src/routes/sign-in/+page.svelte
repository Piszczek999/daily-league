<script lang="ts">
	import { signIn, signUp } from '$lib/auth-client';
	import { Github } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let email = '';
	let name = '';
	let password = '';
	let mode: 'signin' | 'signup' = 'signin';
	let loading = false;
	let error = '';

	async function handleEmailAuth() {
		loading = true;
		error = '';
		try {
			if (mode === 'signin') {
				await signIn.email({
					email,
					password,
					callbackURL: '/app'
				});
			} else {
				await signUp.email({
					name,
					email,
					password,
					callbackURL: '/app'
				});
			}
			goto('/app');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Authentication failed';
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex-center h-screen flex-col pt-16">
	<div
		class="flex w-80 flex-col items-center gap-2 divide-y divide-zinc-700 border border-zinc-700 bg-zinc-800 p-4 shadow-lg"
	>
		<h1 class="py-6 text-center text-xl">Login to <b>DailyLeague</b></h1>
		<div class="w-full space-y-4 p-4">
			<!-- Email/Password Form -->
			<form onsubmit={handleEmailAuth} class="space-y-3">
				{#if mode === 'signup'}
					<input
						type="text"
						placeholder="Name"
						bind:value={name}
						class="w-full border border-zinc-600 bg-zinc-700 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none"
						required
					/>
				{/if}
				<input
					type="email"
					placeholder="Email"
					bind:value={email}
					class="w-full border border-zinc-600 bg-zinc-700 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					bind:value={password}
					class="w-full border border-zinc-600 bg-zinc-700 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none"
					required
				/>
				{#if error}
					<p class="text-sm text-red-500">{error}</p>
				{/if}
				<button
					type="submit"
					disabled={loading}
					class="w-full bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
				>
					{loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
				</button>
			</form>

			<div class="flex gap-2">
				<button
					type="button"
					onclick={() => {
						mode = 'signin';
						error = '';
					}}
					class="flex-1 px-3 py-2 {mode === 'signin'
						? 'bg-blue-600 text-white'
						: 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'} text-sm transition-colors"
				>
					Sign In
				</button>
				<button
					type="button"
					onclick={() => {
						mode = 'signup';
						error = '';
					}}
					class="flex-1 px-3 py-2 {mode === 'signup'
						? 'bg-blue-600 text-white'
						: 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'} text-sm transition-colors"
				>
					Sign Up
				</button>
			</div>

			<!-- GitHub Login -->
			<div class="border-t border-zinc-700 pt-4">
				<button
					class="flex w-full cursor-pointer justify-center gap-2 bg-black p-4 px-6 transition-colors hover:bg-zinc-900"
					onclick={() => {
						signIn.social({
							provider: 'github',
							callbackURL: '/app'
						});
					}}
				>
					<Github />
					Login with Github
				</button>
			</div>
		</div>
	</div>
</div>
