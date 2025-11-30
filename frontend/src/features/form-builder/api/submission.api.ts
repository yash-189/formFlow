// API functions for form submissions
import { apiClient } from '@/shared/api/client';
import { submissionPaths } from '@/shared/config/endpoints';
import { normalizeResponse } from '@/shared/api/normalizeResponse';
import { adaptError } from '@/shared/api/error.adapter';
import type { SubmissionResponse, FormSubmissionData } from '../types/submission.types';

export async function submitForm(formData: FormSubmissionData): Promise<SubmissionResponse> {
    try {
        const { formId, ...data } = formData;
        const { data: response } = await apiClient.post(submissionPaths.create(), {
            formId,
            data
        });
        return normalizeResponse<SubmissionResponse>(response).data;
    } catch (error) {
        throw adaptError(error);
    }
}
