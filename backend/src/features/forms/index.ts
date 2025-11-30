import mongoose from 'mongoose';
import type { Logger } from 'winston';
import { createFormRepository } from './repositories/form.repository';
import { createFormService } from './services/form.service';
import { createFormController } from './controllers/form.controller';
import { createFormRoutes } from './routes/form.routes';

export const createFormRouter = (db: mongoose.Connection, logger: Logger) => {
    const repository = createFormRepository(db);
    const service = createFormService(repository, logger);
    const controller = createFormController(service);
    const routes = createFormRoutes(controller);

    return routes;
};
