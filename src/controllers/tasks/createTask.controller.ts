import { Task } from '../../models/task';

export function createTask(task: Task) {
  console.log(`The task to be created: ${task.id}`);
}
