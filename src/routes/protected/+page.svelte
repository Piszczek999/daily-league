<script lang="ts">
	import type { PageData } from './$types';

	let data: PageData = $props();
	let user = data.session.user;
</script>

<div class="container">
	<h1>Protected Page</h1>
	<p>Only authenticated users can see this page.</p>
	<p>User ID: {user?.id}</p>
</div>
