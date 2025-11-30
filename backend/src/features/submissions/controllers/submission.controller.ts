import { Request, Response, NextFunction } from 'express';
import type { SubmissionService } from '../services/submission.service';

export const createSubmissionController = (
    submissionService: SubmissionService
) => ({
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const submission = await submissionService.createSubmission(req.body);
            res.status(201).json({ data: submission });
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await submissionService.getSubmissions(req.query as any);
            res.json({
                data: result.submissions,
                pagination: {
                    page: result.page,
                    total: result.total,
                    totalPages: result.totalPages,
                }
            });
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const submission = await submissionService.getSubmissionById(req.params.id);
            res.json({ data: submission });
        } catch (error) {
            next(error);
        }
    },
});

export type SubmissionController = ReturnType<typeof createSubmissionController>;
