import { Textarea } from '@/shared/components/ui/textarea';
import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import type { FormField } from '../../types/form-schema.types';

interface TextareaFieldProps {
    field: FormField;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function TextareaField({ field, value, onChange, error }: TextareaFieldProps) {
    return (
        <FormFieldWrapper
            label={field.label}
            required={field.required}
            error={error}
            htmlFor={field.id}
        >
            <Textarea
                id={field.id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className={error ? 'border-destructive' : ''}
            />
        </FormFieldWrapper>
    );
}
