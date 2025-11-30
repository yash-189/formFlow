import { PageLayout } from '@/shared/components/layout/PageLayout';
import { SubmissionsTable } from '@/features/submissions/components/SubmissionsTable';

export default function SubmissionsPage() {
    return (
        <PageLayout
            title="Form Submissions"
            description="View all submitted form responses"
            maxWidth="7xl"
        >
            <SubmissionsTable />
        </PageLayout>
    );
}
