import z from "zod";

export const riotIdSchema = z.object({
	gameName: z.string().min(3).max(16),
	tagLine: z.string().min(3).max(5)
});
