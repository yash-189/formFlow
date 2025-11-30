import mongoose from 'mongoose';
import type { Logger } from 'winston';
import { createSubmissionRepository } from './repositories/submission.repository';
import { createFormRepository } from '../forms/repositories/form.repository';
import { createFormService } from '../forms/services/form.service';
import { createSubmissionService } from './services/submission.service';
import { createSubmissionController } from './controllers/submission.controller';
import { createSubmissionRoutes } from './routes/submission.routes';

export const createSubmissionRouter = (db: mongoose.Connection, logger: Logger) => {
    const submissionRepository = createSubmissionRepository(db);

    // Create FormService to inject into SubmissionService
    const formRepository = createFormRepository(db);
    const formService = createFormService(formRepository, logger);

    const service = createSubmissionService(submissionRepository, formService, logger);
    const controller = createSubmissionController(service);
    const routes = createSubmissionRoutes(controller);

    return routes;
};
