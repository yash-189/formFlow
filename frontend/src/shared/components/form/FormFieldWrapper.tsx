import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

interface FormFieldWrapperProps {
    label: string;
    required?: boolean;
    error?: string;
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

export function FormFieldWrapper({
    label,
    required,
    error,
    htmlFor,
    children,
    className,
}: FormFieldWrapperProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
