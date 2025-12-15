<script lang="ts">
	import { authClient } from '$lib/auth-client';
</script>

<button
	class="w-full"
	onclick={() => {
		authClient.signIn.social({
			provider: 'github',
			callbackURL: '/app'
		});
	}}
>
	Login with Github
</button>
