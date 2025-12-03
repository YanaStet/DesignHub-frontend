import { z } from "zod";

export const designerProfileSchema = z.object({
  specialization: z.string().optional(),
  bio: z.string().optional(),
});

export type DesignerProfileSchema = z.infer<typeof designerProfileSchema>;
