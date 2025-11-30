import { PageLayout } from '@/shared/components/layout/PageLayout';
import { DynamicForm } from '@/features/form-builder/components/DynamicForm';

export default function FormPage() {
    return (
        <PageLayout
            title="Employee Onboarding Form"
            description="Please fill out all required fields to submit your information"
            maxWidth="4xl"
        >
            <DynamicForm />
        </PageLayout>
    );
}
