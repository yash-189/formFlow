import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import type { FormField } from '../../types/form-schema.types';

interface SelectFieldProps {
    field: FormField;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function SelectField({ field, value, onChange, error }: SelectFieldProps) {
    return (
        <FormFieldWrapper
            label={field.label}
            required={field.required}
            error={error}
            htmlFor={field.id}
        >
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={field.id} className={error ? 'border-destructive' : ''}>
                    <SelectValue placeholder={field.placeholder || 'Select an option'} />
                </SelectTrigger>
                <SelectContent>
                    {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormFieldWrapper>
    );
}
