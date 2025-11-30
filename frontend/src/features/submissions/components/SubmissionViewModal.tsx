import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import type { Submission } from '../types/submissions.types';

interface SubmissionViewModalProps {
    submission: Submission;
    onClose: () => void;
}

export function SubmissionViewModal({ submission, onClose }: SubmissionViewModalProps) {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Submission Details</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Submitted on {format(new Date(submission.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 gap-4">
                        {Object.entries(submission.data).map(([key, value]) => (
                            <div key={key} className="border-b border-border pb-3">
                                <dt className="text-sm font-medium text-muted-foreground mb-1 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </dt>
                                <dd className="text-sm text-foreground">
                                    {Array.isArray(value) ? (
                                        <div className="flex flex-wrap gap-2">
                                            {value.map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                                                >
                                                    {String(item)}
                                                </span>
                                            ))}
                                        </div>
                                    ) : typeof value === 'boolean' ? (
                                        <span className={`font-medium ${value ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                            {value ? 'Yes' : 'No'}
                                        </span>
                                    ) : value === null || value === undefined || value === '' ? (
                                        <span className="text-muted-foreground/60 italic">Not provided</span>
                                    ) : (
                                        <span>{String(value)}</span>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </div>

                    <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                            Submission ID: <span className="font-mono">{submission.id}</span>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
