import type { Logger } from 'winston';
import type { SubmissionRepository } from '../repositories/submission.repository';
import type { FormService } from '../../forms/services/form.service';
import type { CreateSubmissionDTO, GetSubmissionsQuery } from '../validators/submission.validator';
import { NotFoundError } from '../../../shared/errors/AppError';

export const createSubmissionService = (
    submissionRepository: SubmissionRepository,
    formService: FormService,
    logger: Logger
) => ({
    createSubmission: async (data: CreateSubmissionDTO) => {
        logger.info('Creating submission');

        // Validate form exists using FormService
        await formService.getFormById(data.formId);

        const submission = await submissionRepository.create({
            formId: data.formId,
            data: data.data,
        });

        logger.info(`Submission created: ${submission._id}`);
        return submission;
    },

    getSubmissions: async (query: GetSubmissionsQuery) => {
        logger.info('Fetching submissions', query);
        const result = await submissionRepository.findAll(query);
        logger.info(`Fetched ${result.submissions.length} submissions`);
        return result;
    },

    getSubmissionById: async (id: string) => {
        const submission = await submissionRepository.findById(id);
        if (!submission) {
            throw new NotFoundError('Submission not found');
        }
        return submission;
    },
});

export type SubmissionService = ReturnType<typeof createSubmissionService>;
