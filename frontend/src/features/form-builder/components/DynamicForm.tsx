import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/feedback/ErrorMessage';
import { FormFieldRenderer } from './FormFieldRenderer';
import { useFormSchema } from '../hooks/useFormSchema';
import { useFormSubmission } from '../hooks/useFormSubmission';
import type { FormSubmissionData } from '../types/submission.types';
import { ROUTES } from '@/shared/constants/routes';
import { CheckCircle } from 'lucide-react';

export function DynamicForm() {
    const navigate = useNavigate();
    const { data: schema, isLoading, error } = useFormSchema();
    const mutation = useFormSubmission();

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFieldChange = (fieldId: string, value: any) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
        if (validationErrors[fieldId]) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        if (!schema) return false;

        const errors: Record<string, string> = {};

        schema.fields.forEach((field) => {
            const value = formData[field.id];

            if (field.required) {
                if (value === undefined || value === null || value === '' ||
                    (Array.isArray(value) && value.length === 0)) {
                    errors[field.id] = `${field.label} is required`;
                    return;
                }
            }

            if (!value && !field.required) return;

            if (field.validation) {
                const val = field.validation;

                if (typeof value === 'string') {
                    if (val.minLength && value.length < val.minLength) {
                        errors[field.id] = `Minimum length is ${val.minLength}`;
                    }
                    if (val.maxLength && value.length > val.maxLength) {
                        errors[field.id] = `Maximum length is ${val.maxLength}`;
                    }
                    if (val.regex && !new RegExp(val.regex).test(value)) {
                        errors[field.id] = `Invalid format`;
                    }
                }

                if (typeof value === 'number') {
                    if (val.min !== undefined && value < val.min) {
                        errors[field.id] = `Minimum value is ${val.min}`;
                    }
                    if (val.max !== undefined && value > val.max) {
                        errors[field.id] = `Maximum value is ${val.max}`;
                    }
                }

                if (Array.isArray(value)) {
                    if (val.minSelected && value.length < val.minSelected) {
                        errors[field.id] = `Select at least ${val.minSelected} options`;
                    }
                    if (val.maxSelected && value.length > val.maxSelected) {
                        errors[field.id] = `Select at most ${val.maxSelected} options`;
                    }
                }

                if (field.type === 'date' && val.minDate) {
                    if (new Date(value) < new Date(val.minDate)) {
                        errors[field.id] = `Date must be after ${val.minDate}`;
                    }
                }
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!schema) {
            return;
        }

        mutation.mutate({ formId: schema._id, ...formData } as FormSubmissionData, {
            onSuccess: () => {
                setShowSuccess(true);
                setFormData({});
                setTimeout(() => {
                    navigate(ROUTES.SUBMISSIONS);
                }, 2000);
            },
            onError: (error: any) => {
                if (error?.errors) {
                    setValidationErrors(error.errors);
                }
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error.message || 'Failed to load form schema'} />;
    }

    if (!schema) {
        return <ErrorMessage message="No form schema available" />;
    }

    if (showSuccess) {
        return (
            <div className="max-w-3xl mx-auto bg-card text-card-foreground rounded-xl shadow-sm border border-border p-8">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Submission Successful!</h3>
                    <p className="text-muted-foreground text-center mb-6">
                        Your form has been submitted successfully. Redirecting to submissions...
                    </p>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
            <div className=" p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {schema.fields.map((field) => {
                            const isFullWidth = field.type === 'textarea' || field.type === 'switch' || field.type === 'multi-select';

                            return (
                                <div
                                    key={field.id}
                                    className={isFullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1'}
                                >
                                    <FormFieldRenderer
                                        field={field}
                                        value={formData[field.id]}
                                        onChange={(value) => handleFieldChange(field.id, value)}
                                        error={validationErrors[field.id] || (mutation.error as any)?.errors?.[field.id]}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {mutation.error && !(mutation.error as any)?.errors && (
                        <div className="mt-6">
                            <ErrorMessage message={(mutation.error as any)?.message || 'Submission failed'} />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(ROUTES.SUBMISSIONS)}
                            className="w-full sm:w-auto"
                        >
                            View Submissions
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full sm:w-auto min-w-[150px]"
                        >
                            {mutation.isPending ? (
                                <>
                                    <LoadingSpinner size="sm" className="mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Form'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
