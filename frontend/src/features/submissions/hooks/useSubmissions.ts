// React Query hook for submissions
// React Query hook for submissions
import { useQuery } from '@tanstack/react-query';
import { getSubmissions } from '../api/submissions.api';
import { SUBMISSIONS_QUERY_KEYS } from '../constants/queryKeys';
import type { SubmissionsQueryParams } from '../types/submissions.types';

export function useSubmissions(params: SubmissionsQueryParams) {
    return useQuery({
        queryKey: SUBMISSIONS_QUERY_KEYS.list(params),
        queryFn: () => getSubmissions(params),
    });
}
