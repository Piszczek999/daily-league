<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	let { data } = $props();
	let { user } = $derived(data);
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 flex gap-2">
		<div class="grid grid-cols-3 gap-6 perspective-near">
			{#each ['yellow', 'blue', 'green', 'red', 'purple'] as color}
				<Card
					class="h-64 w-48"
					title="Vision is Victory"
					description="Maintain a vision score of 30 or more in a single match"
					{color}
				/>
			{/each}
		</div>
	</div>
</div>
