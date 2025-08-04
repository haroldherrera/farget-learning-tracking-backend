import { prisma } from '../dbConnection/dbConnection';
import { sendErrorResponse } from '../utils/prismaErrorHandler';
import { Request, Response } from 'express';

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();

    res
      .status(200)
      .json({ message: 'Users retrieved succesfully', data: users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const userCreated = await prisma.user.create({ data: req.body });

    res
      .status(201)
      .json({ message: 'User created succesfully', data: userCreated });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
