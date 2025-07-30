import { NextFunction, RequestHandler, Request } from 'express';
import { ZodObject } from 'zod';

export function validateSchema(schema: ZodObject): RequestHandler {
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

    req.body = result.data;

    next();
  };
}
