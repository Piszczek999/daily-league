<script lang="ts">
	import { signIn, signUp } from "$lib/auth-client";
	import { Eye, EyeOff, Github } from "@lucide/svelte";
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import { fade } from "svelte/transition";

	let email = "";
	let name = "";
	let password = "";
	let mode: "signin" | "signup" = "signin";
	let loading = false;
	let error = "";
	let showPassword = false;

	async function handleEmailAuth() {
		loading = true;
		error = "";
		try {
			if (mode === "signin") {
				await signIn.email({
					email,
					password,
					callbackURL: "/app"
				});
			} else {
				await signUp.email({
					name,
					email,
					password,
					callbackURL: "/app"
				});
			}
			goto("/app");
		} catch (err) {
			error = err instanceof Error ? err.message : "Authentication failed";
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
		<div class="flex w-full flex-col gap-4 p-2">
			<!-- Email/Password Form -->
			<form onsubmit={handleEmailAuth} class="flex flex-col gap-4">
				{#if mode === "signup"}
					<input
						in:fade
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
				<div class="relative w-full">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						bind:value={password}
						class="w-full border border-zinc-600 bg-zinc-700 px-3 py-2 pr-10 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none"
						required
					/>

					<button
						type="button"
						class="absolute inset-y-0 right-2 flex items-center text-zinc-400 hover:text-white"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{#if showPassword}
							<EyeOff size={20} />
						{:else}
							<Eye size={20} />
						{/if}
					</button>
				</div>
				{#if error}
					<p class="text-sm text-red-500">{error}</p>
				{/if}
				<Button type="submit" disabled={loading} variant="secondary">
					{loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
				</Button>
			</form>
			{#if mode === "signup"}
				<Button
					onclick={() => {
						mode = "signin";
						error = "";
					}}
					variant="primary"
					class="mt-4"
				>
					Sign in instead
				</Button>
			{:else}
				<Button
					onclick={() => {
						mode = "signup";
						error = "";
					}}
					variant="primary"
					class="mt-4"
				>
					Don't have an account
				</Button>
			{/if}

			<!-- GitHub Login -->
			<div class="border-t border-zinc-700 pt-4">
				<button
					class="flex w-full cursor-pointer justify-center gap-2 bg-black p-4 px-6 transition-colors hover:bg-zinc-900"
					onclick={() => {
						signIn.social({
							provider: "github",
							callbackURL: "/app"
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
