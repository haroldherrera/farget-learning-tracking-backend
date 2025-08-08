import { z } from 'zod';

export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

export const CreateTaskInputSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(1000),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  assigneeId: z.cuid().optional().nullable(),
  reporterId: z.cuid(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;

export const EditTaskInputSchema = CreateTaskInputSchema.partial();

export type EditTaskInput = z.infer<typeof EditTaskInputSchema>;
