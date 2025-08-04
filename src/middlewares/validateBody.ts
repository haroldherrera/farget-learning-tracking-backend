import { NextFunction, RequestHandler, Request } from 'express';
import z from 'zod';
import { sanitizeInput } from '../utils/sanitizeInput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateBody(schema: z.ZodType<any>): RequestHandler {
  return (req: Request, res, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      res.status(400).json({ errors: formatted });
      return;
    }

    req.body = sanitizeInput(result.data);

    next();
  };
}
