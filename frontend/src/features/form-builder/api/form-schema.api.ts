// API functions for fetching form schema
import { apiClient } from '@/shared/api/client';
import { formSchemaPaths } from '@/shared/config/endpoints';
import { normalizeResponse } from '@/shared/api/normalizeResponse';
import { adaptError } from '@/shared/api/error.adapter';
import type { FormSchema } from '../types/form-schema.types';

export async function getFormSchema(): Promise<FormSchema> {
    try {
        const { data } = await apiClient.get(formSchemaPaths.schema());
        return normalizeResponse<FormSchema>(data).data;
    } catch (error) {
        throw adaptError(error);
    }
}
