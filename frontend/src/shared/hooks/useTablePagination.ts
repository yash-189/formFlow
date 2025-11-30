import { useState, useMemo } from 'react';
import type { SortingState, ColumnDef } from '@tanstack/react-table';

interface UseTablePaginationOptions<TData> {
    columns: ColumnDef<TData>[];
    initialPageSize?: number;
    initialSorting?: SortingState;
}

export function useTablePagination<TData>({
    columns,
    initialPageSize = 10,
    initialSorting = [],
}: UseTablePaginationOptions<TData>) {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sorting, setSorting] = useState<SortingState>(initialSorting);

    // Derive sort params for API calls
    const sortField = sorting.length > 0 ? sorting[0].id : undefined;
    const sortOrder = sorting.length > 0 && sorting[0].desc ? 'desc' : 'asc';

    const memoizedColumns = useMemo(() => columns, [columns]);

    return {
        // Table state
        columns: memoizedColumns,
        pageIndex,
        pageSize,
        sorting,

        // For API calls (1-indexed for backend)
        page: pageIndex + 1,
        sortField,
        sortOrder,

        // State setters
        setPageIndex,
        setPageSize,
        setSorting,
    };
}
