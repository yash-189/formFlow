// Type definitions for form submission
export interface SubmissionResponse {
    success: boolean;
    id?: string;
    createdAt?: string;
    errors?: Record<string, string>;
}

export interface FormSubmissionData {
    formId: string;
    [key: string]: unknown;
}
