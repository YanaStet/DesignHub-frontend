import { z } from "zod";

export const workCreateSchema = z.object({
  title: z.string().min(1, "Title is required."),

  description: z.string().optional(),
});

export type WorkCreateSchema = z.infer<typeof workCreateSchema>;
