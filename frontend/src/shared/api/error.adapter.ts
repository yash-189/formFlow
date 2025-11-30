import { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    status?: number;
    errors?: Record<string, string>;
}

export function adaptError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        return {
            message: data?.message || error.message || 'An unexpected error occurred',
            status,
            errors: data?.errors,
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    return {
        message: 'An unexpected error occurred',
    };
}
