import { Router } from 'express';
import { listTasks } from '../controllers/tasks/listTasks.controller';
import { createTask } from '../controllers/tasks/createTask.controller';

export const router = Router();

// Get the list of all tasks created in the DB
router.get('/', (req, res) => {
  const tasks = listTasks();

  res.status(200).json({ tasks: tasks });
});

// Create a new task in the DB
router.post('/', (req, res) => {
  createTask(req.body.task);
  res.send({ message: 'Task Created' });
});

// Get a task by its id
router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send([{ id: 1, description: `Task Description ${req.params.id}` }]);
});

// Update a task. by its id
router.patch('/:id', (req, res) => {
  console.log(req.params);
  res.send(`Taks ${req.params.id} updated successfully`);
});

// Delete a task by its id
router.delete('/:id', (req, res) => {
  console.log(req.params);
  res.send(`Task: ${req.params.id} deleted successfully`);
});
