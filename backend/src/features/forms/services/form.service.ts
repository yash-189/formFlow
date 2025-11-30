import type { Logger } from 'winston';
import type { FormRepository } from '../repositories/form.repository';
import { NotFoundError } from '@/shared/errors/AppError';

export const createFormService = (
    formRepository: FormRepository,
    logger: Logger
) => ({
    getFormSchema: async () => {
        logger.info('Fetching form schema');
        const form = await formRepository.findDefault();

        if (!form) {
            throw new NotFoundError('Form schema not found');
        }

        return form;
    },

    getFormById: async (id: string) => {
        const form = await formRepository.findById(id);
        if (!form) {
            throw new NotFoundError('Form not found');
        }
        return form;
    },
});

export type FormService = ReturnType<typeof createFormService>;
