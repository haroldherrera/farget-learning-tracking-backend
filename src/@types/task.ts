import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string(),
  status: z.enum(['To Do', 'In Progress', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  assignee: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    })
    .nullable(),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
  }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Task = z.infer<typeof taskSchema>;
