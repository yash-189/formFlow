// Base API endpoints - NO MAGIC STRINGS!
const BASE_ENDPOINTS = {
    formSchema: '/forms/schema',
    submissions: '/submissions',
} as const;

// Form schema endpoint paths
export const formSchemaPaths = {
    schema: () => BASE_ENDPOINTS.formSchema,
} as const;

// Submission endpoint paths
export const submissionPaths = {
    create: () => BASE_ENDPOINTS.submissions,
    list: () => BASE_ENDPOINTS.submissions,
    byId: (id: string) => `${BASE_ENDPOINTS.submissions}/${id}`,
} as const;
