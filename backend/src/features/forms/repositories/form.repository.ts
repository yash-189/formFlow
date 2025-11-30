import mongoose from 'mongoose';
import { FormModel } from '../models/form.model';

export const createFormRepository = (db: mongoose.Connection) => ({
    findById: async (id: string) => {
        return FormModel.findById(id).lean();
    },

    findDefault: async () => {
        return FormModel.findOne({ isActive: true }).lean();
    },

    create: async (data: any) => {
        const form = new FormModel(data);
        return form.save();
    },

    update: async (id: string, data: any) => {
        return FormModel.findByIdAndUpdate(id, data, { new: true }).lean();
    },
});

export type FormRepository = ReturnType<typeof createFormRepository>;
