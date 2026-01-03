import type { Platform, Region } from "@prisma/client";

export const PLATFORM_TO_REGION: Record<Platform, Region> = {
	na1: "americas",
	br1: "americas",
	la1: "americas",
	la2: "americas",

	kr: "asia",
	jp1: "asia",

	eun1: "europe",
	euw1: "europe",
	tr1: "europe",
	ru: "europe",

	oc1: "sea",
	sg2: "sea",
	tw2: "sea",
	vn2: "sea"
};
