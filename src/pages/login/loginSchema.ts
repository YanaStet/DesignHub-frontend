import z from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "8 symbols." })
    .max(8, { error: "8 symbols." }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const regFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "8 symbols." })
    .max(8, { error: "8 symbols." }),
});

export type RegFormSchema = z.infer<typeof regFormSchema>;
