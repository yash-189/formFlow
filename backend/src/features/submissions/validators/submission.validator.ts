import { z } from 'zod';

// Shared with frontend!
export const createSubmissionSchema = z.object({
    formId: z.string(),
    data: z.record(z.unknown()),
});

export const getSubmissionsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    sortBy: z.enum(['createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateSubmissionDTO = z.infer<typeof createSubmissionSchema>;
export type GetSubmissionsQuery = z.infer<typeof getSubmissionsQuerySchema>;
