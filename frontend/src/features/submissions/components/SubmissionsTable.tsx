import { useNavigate } from 'react-router-dom';
import { ReusableTable } from '@/shared/components/ui/data-table/ReusableTable';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/feedback/ErrorMessage';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { useSubmissionsTable } from '../hooks/useSubmissionsTable';
import { SubmissionViewModal } from './SubmissionViewModal';
import { FileText } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';

export function SubmissionsTable() {
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        error,
        columns,
        pageIndex,
        pageSize,
        sorting,
        setPageIndex,
        setPageSize,
        setSorting,
        selectedSubmission,
        setSelectedSubmission,
    } = useSubmissionsTable();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error.message || 'Failed to load submissions'} />;
    }

    if (!data || (data.submissions.length === 0 && pageIndex === 0)) {
        return (
            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-border p-8">
                    <EmptyState
                        icon={<FileText className="w-8 h-8 text-muted-foreground" />}
                        title="No Submissions Yet"
                        description="There are no form submissions to display. Submit a form to see it here."
                        action={{
                            label: 'Go to Form',
                            onClick: () => navigate(ROUTES.FORM),
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
                <ReusableTable
                    columns={columns}
                    data={data.submissions}
                    totalItems={data.total}
                    pageCount={data.totalPages}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}

                />
            </div>


            {selectedSubmission && (
                <SubmissionViewModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )
            }
        </>
    );
}
