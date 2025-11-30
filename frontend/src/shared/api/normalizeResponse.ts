interface NormalizedResponse<T = unknown> {
    data: T;
    success: boolean;
    message?: string;
}

export function normalizeResponse<T = unknown>(response: any): NormalizedResponse<T> {
    // If response already has the expected structure
    if (response && typeof response === 'object' && 'data' in response) {
        return {
            data: response.data,
            success: response.success ?? true,
            message: response.message,
        };
    }

    // Otherwise, treat the entire response as data
    return {
        data: response as T,
        success: true,
    };
}
