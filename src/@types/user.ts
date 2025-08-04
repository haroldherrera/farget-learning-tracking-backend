import { z } from 'zod';

export const CreateUserInputSchema = z.object({
  name: z.string().max(100),
  email: z.email().max(255),
});

export type CreateUserInputType = z.infer<typeof CreateUserInputSchema>;
