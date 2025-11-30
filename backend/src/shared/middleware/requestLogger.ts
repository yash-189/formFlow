import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    // Log request start
    logger.info('Request started', {
        method: req.method,
        url: req.url,
        ip: req.ip,
    });

    // Capture response finish
    res.on('finish', () => {
        const executionTime = Date.now() - startTime;

        // Log request end with execution time
        logger.info('Request completed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            executionTime: `${executionTime}ms`,
        });
    });

    next();
};
