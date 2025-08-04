import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { createUser, listUsers } from '../controllers/users.controller';
import { CreateUserInputSchema } from '../@types/user';

export const routerUsers = Router();

routerUsers.get('/', listUsers);

routerUsers.post('/', validateBody(CreateUserInputSchema), createUser);
