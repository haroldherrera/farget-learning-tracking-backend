import { Task } from '../../@types/task';

export function createTask(task: Task) {
  console.log(`The taskId of the task to be created: ${task.id}`);
}
