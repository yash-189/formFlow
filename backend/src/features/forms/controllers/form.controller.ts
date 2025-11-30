import { Request, Response, NextFunction } from 'express';
import type { FormService } from '../services/form.service';

export const createFormController = (formService: FormService) => ({
    getSchema: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = await formService.getFormSchema();
            res.json({ data: schema });
        } catch (error) {
            next(error);
        }
    },
});

export type FormController = ReturnType<typeof createFormController>;
