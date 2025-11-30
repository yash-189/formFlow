import { Router } from 'express';
import type { SubmissionController } from '../controllers/submission.controller';
import { validateRequest } from '@/shared/middleware/validateRequest';
import { createSubmissionSchema, getSubmissionsQuerySchema } from '../validators/submission.validator';

export const createSubmissionRoutes = (controller: SubmissionController) => {
    const router = Router();

    router.post(
        '/',
        validateRequest(createSubmissionSchema, 'body'),
        controller.create
    );

    router.get(
        '/',
        validateRequest(getSubmissionsQuerySchema, 'query'),
        controller.getAll
    );

    router.get('/:id', controller.getById);

    return router;
};
