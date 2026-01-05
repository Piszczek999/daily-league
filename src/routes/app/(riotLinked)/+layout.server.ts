import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
	console.log("/app/(riotLinked) layout load");
	const session = await parent();
	if (!session.user.puuid) redirect(303, "/app/riotid");
};
