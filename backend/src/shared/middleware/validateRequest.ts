import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ValidationError } from '../errors/AppError';

type RequestLocation = 'body' | 'query' | 'params';

export const validateRequest = (
    schema: ZodSchema,
    location: RequestLocation = 'body'
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req[location] = schema.parse(req[location]);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                next(new ValidationError('Validation failed', error.errors));
            } else {
                next(error);
            }
        }
    };
};
