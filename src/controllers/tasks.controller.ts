import { prisma } from '../dbConnection/dbConnection';
import { sendErrorResponse } from '../utils/prismaErrorHandler';
import { Request, Response } from 'express';

export async function listTasks(req: Request, res: Response) {
  console.log('This is the DBUrl', process.env.DATABASE_URL);
  console.error('This is the DBUrl', process.env.DATABASE_URL);
  try {
    const tasks = await prisma.task.findMany();
    res
      .status(200)
      .json({ message: 'Tasks retrieved succesfully', data: tasks });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const taskCreated = await prisma.task.create({ data: req.body });
    res
      .status(201)
      .json({ message: 'Tasks created succesfully', data: taskCreated });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      res.status(404).json({
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occured.',
      });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export async function editTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const taskUpdated = await prisma.task.update({
      data: req.body,
      where: { id },
    });

    res
      .status(200)
      .json({ message: 'Task Updated Succesfully', data: taskUpdated });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const taskDeleted = await prisma.task.delete({ where: { id } });

    res
      .status(200)
      .json({ message: 'Task deleted successfully', data: taskDeleted });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
