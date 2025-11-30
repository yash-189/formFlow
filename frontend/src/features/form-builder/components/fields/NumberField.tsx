import { Input } from '@/shared/components/ui/input';
import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import type { FormField } from '../../types/form-schema.types';

interface NumberFieldProps {
    field: FormField;
    value: number | '';
    onChange: (value: number | '') => void;
    error?: string;
}

export function NumberField({ field, value, onChange, error }: NumberFieldProps) {
    return (
        <FormFieldWrapper
            label={field.label}
            required={field.required}
            error={error}
            htmlFor={field.id}
        >
            <Input
                id={field.id}
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder={field.placeholder}
                min={field.validation?.min}
                max={field.validation?.max}
                className={error ? 'border-destructive' : ''}
            />
        </FormFieldWrapper>
    );
}
