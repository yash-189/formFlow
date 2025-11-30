import { type ReactNode } from 'react';
import { FileX2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                {icon || <FileX2 className="w-8 h-8 text-muted-foreground" />}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                    {description}
                </p>
            )}
            {action && (
                <Button onClick={action.onClick} variant={action.variant || 'default'}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}
