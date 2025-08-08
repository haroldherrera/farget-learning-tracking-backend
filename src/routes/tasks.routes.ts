import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { CreateTaskInputSchema, EditTaskInputSchema } from '../@types/task';
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
  listTasks,
} from '../controllers/tasks.controller';

export const routerTasks = Router();

routerTasks.get('/', listTasks);

routerTasks.post('/', validateBody(CreateTaskInputSchema), createTask);

routerTasks.get('/:id', getTaskById);

routerTasks.patch('/:id', validateBody(EditTaskInputSchema), editTask);

routerTasks.delete('/:id', deleteTask);
