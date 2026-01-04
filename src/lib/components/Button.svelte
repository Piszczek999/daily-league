<script lang="ts">
	import { LoaderCircle } from "@lucide/svelte";
	import { Button, mergeProps } from "bits-ui";
	import { twMerge } from "tailwind-merge";

	type Variant = "default" | "primary" | "secondary" | "ghost" | "danger";
	type Size = "sm" | "md" | "lg";

	type Props = Button.RootProps & {
		pending?: boolean;
		variant?: Variant;
		size?: Size;
		fullWidth?: boolean;
	};

	let {
		children,
		pending = false,
		variant = "default",
		size = "md",
		fullWidth = false,
		class: className,
		...props
	}: Props = $props();

	const variants: Record<Variant, string> = {
		default: "border border-zinc-300 bg-transparent text-zinc-300 hover:bg-zinc-600",
		primary: "bg-zinc-700 text-zinc-300 hover:bg-zinc-600 border-none",
		secondary: "bg-zinc-200 font-semibold text-zinc-900 hover:bg-zinc-300 border-none",
		ghost: "bg-transparent hover:bg-zinc-600 border-none",
		danger: "bg-red-600 text-white hover:bg-red-700 border-none"
	};

	const sizes: Record<Size, string> = {
		sm: "px-2 py-1 text-xs",
		md: "px-3 py-1.5 text-sm",
		lg: "px-3 py-2 text-xl"
	};

	const loadingSizes: Record<Size, number> = {
		sm: 16,
		md: 20,
		lg: 24
	};

	const baseStyles =
		"cursor-pointer uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

	const buttonClass = $derived(
		twMerge(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className as string)
	);

	const mergedProps = $derived(
		mergeProps(
			{
				class: buttonClass
			},
			props
		)
	);
</script>

<Button.Root {...mergedProps}>
	{#if pending}
		<LoaderCircle class="mx-auto animate-spin" size={loadingSizes[size]} />
	{:else if children}
		{@render children()}
	{:else}
		Button
	{/if}
</Button.Root>
