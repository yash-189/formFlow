// React Query keys for form-builder feature
export const FORM_QUERY_KEYS = {
    all: () => ['form'] as const,
    schema: () => [...FORM_QUERY_KEYS.all(), 'schema'] as const,
} as const;
