// React Query hook for form schema
import { useQuery } from '@tanstack/react-query';
import { getFormSchema } from '../api/form-schema.api';
import { FORM_QUERY_KEYS } from '../constants/queryKeys';

export function useFormSchema() {
    return useQuery({
        queryKey: FORM_QUERY_KEYS.schema(),
        queryFn: getFormSchema,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
