import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
    return (
        <div className={`flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg ${className}`}>
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
                <h4 className="text-sm font-medium text-destructive mb-1">Error</h4>
                <p className="text-sm text-destructive/90">{message}</p>
            </div>
        </div>
    );
}
