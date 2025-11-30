import mongoose from 'mongoose';
import { SubmissionModel } from '../models/submission.model';

interface PaginationOptions {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

export const createSubmissionRepository = (db: mongoose.Connection) => ({
    create: async (data: { formId: string; data: Record<string, unknown> }) => {
        const submission = new SubmissionModel(data);
        return submission.save();
    },

    findAll: async (options: PaginationOptions) => {
        const { page, limit, sortBy, sortOrder } = options;
        const skip = (page - 1) * limit;

        const [submissions, total] = await Promise.all([
            SubmissionModel.find()
                .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            SubmissionModel.countDocuments()
        ]);

        return {
            submissions,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    },

    findById: async (id: string) => {
        return SubmissionModel.findById(id).lean();
    },
});

export type SubmissionRepository = ReturnType<typeof createSubmissionRepository>;
