import { useState, useMemo } from 'react';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { useSubmissions } from './useSubmissions';
import { createSubmissionsColumns } from '../components/SubmissionsTableColumns';
import type { Submission } from '../types/submissions.types';

export function useSubmissionsTable() {
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    const columns = useMemo(
        () => createSubmissionsColumns(),
        []
    );

    // Use generic table hook for state management
    const table = useTablePagination({
        columns,
        initialPageSize: 10,
        initialSorting: [{ id: 'createdAt', desc: true }],
    });

    // Feature-specific data fetching
    const { data, isLoading, error } = useSubmissions({
        page: table.page,
        limit: table.pageSize,
        sortBy: table.sortField as 'createdAt' | undefined,
        sortOrder: table.sortOrder as 'asc' | 'desc',
    });

    return {
        // Data
        data,
        isLoading,
        error,

        // Table state from generic hook
        ...table,

        // Feature-specific modal state
        selectedSubmission,
        setSelectedSubmission,
    };
}
