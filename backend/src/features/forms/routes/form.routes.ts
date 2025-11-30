import { Router } from 'express';
import type { FormController } from '../controllers/form.controller';

export const createFormRoutes = (controller: FormController) => {
    const router = Router();

    router.get('/schema', controller.getSchema);

    return router;
};
