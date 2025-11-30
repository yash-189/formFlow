import { Input } from '@/shared/components/ui/input';
import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import type { FormField } from '../../types/form-schema.types';

interface TextFieldProps {
    field: FormField;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function TextField({ field, value, onChange, error }: TextFieldProps) {
    return (
        <FormFieldWrapper
            label={field.label}
            required={field.required}
            error={error}
            htmlFor={field.id}
        >
            <Input
                id={field.id}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                className={error ? 'border-destructive' : ''}
            />
        </FormFieldWrapper>
    );
}
