// React Query keys for submissions feature
export const SUBMISSIONS_QUERY_KEYS = {
    all: () => ['submissions'] as const,
    list: (params?: any) => [...SUBMISSIONS_QUERY_KEYS.all(), 'list', params] as const,
} as const;
