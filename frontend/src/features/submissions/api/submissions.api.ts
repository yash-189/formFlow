// API functions for fetching submissions
import { apiClient } from '@/shared/api/client';
import { submissionPaths } from '@/shared/config/endpoints';
import { adaptError } from '@/shared/api/error.adapter';
import type { SubmissionsResponse, SubmissionsQueryParams } from '../types/submissions.types';

export async function getSubmissions(params: SubmissionsQueryParams): Promise<SubmissionsResponse> {
    try {
        const { data } = await apiClient.get(submissionPaths.list(), { params });


        return {
            submissions: data.data,
            total: data.pagination.total,
            page: data.pagination.page,
            totalPages: data.pagination.totalPages,
        };
    } catch (error) {
        throw adaptError(error);
    }
}
