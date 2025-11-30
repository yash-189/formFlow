import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { AppError } from '../errors/AppError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        const errorDetails: any = {
            statusCode: err.statusCode,
            url: req.url,
            method: req.method,
        };

        // Log validation errors with full details
        if (err.hasOwnProperty('errors')) {
            errorDetails.errors = (err as any).errors;
            errorDetails.requestBody = req.body;
            logger.error(`AppError: ${err.message}`, errorDetails);
        } else {
            logger.error(`AppError: ${err.message}`, errorDetails);
        }

        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                ...(err.hasOwnProperty('errors') && {
                    errors: (err as any).errors
                }),
            },
        });
    }

    // Unexpected errors
    logger.error('Unexpected error:', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
    });

    res.status(500).json({
        error: { message: 'Internal server error' }
    });
};
