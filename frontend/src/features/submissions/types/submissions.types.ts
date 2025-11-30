// Type definitions for submissions
export interface Submission {
    id: string;
    createdAt: string;
    data: Record<string, any>;
}

export interface SubmissionsQueryParams {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export interface SubmissionsResponse {
    submissions: Submission[];
    total: number;
    page: number;
    totalPages: number;
}
