<script lang="ts">
	import { signIn } from '$lib/auth-client';
</script>

<button
	class="w-full"
	onclick={() => {
		signIn.social({
			provider: 'github',
			callbackURL: '/app'
		});
	}}
>
	Login with Github
</button>
