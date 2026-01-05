<script lang="ts">
	import { getChallenges } from "../user.remote";
	import type { LayoutProps } from "./$types";

	const { children }: LayoutProps = $props();
	await getChallenges();
</script>

{@render children()}
