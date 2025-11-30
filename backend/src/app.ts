import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { logger } from './shared/utils/logger';
import { requestLogger } from './shared/middleware/requestLogger';
import { errorHandler } from './shared/middleware/errorHandler';
import { createFormRouter } from './features/forms';
import { createSubmissionRouter } from './features/submissions';

export const createApp = (db: mongoose.Connection) => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    // Routes (each feature creates its own router)
    app.use('/api/forms', createFormRouter(db, logger));
    app.use('/api/submissions', createSubmissionRouter(db, logger));

    // Health Check
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Error Handling Middleware
    app.use(errorHandler);

    return app;
};
