import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name atleast 3 character long"),
  email: z.string().email(),
  password: z.string().min(8, "Password should atleast 8 character long"),
});

export type userInput = z.infer<typeof createUserSchema>;
