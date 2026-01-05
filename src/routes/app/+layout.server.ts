import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
	console.log("/app layout load");
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) redirect(307, "/sign-in");

	return session;
};
