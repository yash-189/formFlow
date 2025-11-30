// React Query mutation hook for form submission
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitForm } from '../api/submission.api';

export function useFormSubmission() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitForm,
        onSuccess: () => {
            // Invalidate submissions list to refresh after new submission
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
}
