// Common shared types across the application
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface SortParams {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
