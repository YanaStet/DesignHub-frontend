import { z } from "zod";

export const formSchema = z.object({
  comment_text: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
