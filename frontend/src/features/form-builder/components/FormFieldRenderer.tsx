import type { FormField } from '../types/form-schema.types';
import { TextField } from './fields/TextField';
import { NumberField } from './fields/NumberField';
import { SelectField } from './fields/SelectField';
import { MultiSelectField } from './fields/MultiSelectField';
import { DateField } from './fields/DateField';
import { TextareaField } from './fields/TextareaField';
import { SwitchField } from './fields/SwitchField';

interface FormFieldRendererProps {
    field: FormField;
    value: any;
    onChange: (value: any) => void;
    error?: string;
}

export function FormFieldRenderer({ field, value, onChange, error }: FormFieldRendererProps) {
    switch (field.type) {
        case 'text':
            return <TextField field={field} value={value || ''} onChange={onChange} error={error} />;

        case 'number':
            return <NumberField field={field} value={value ?? ''} onChange={onChange} error={error} />;

        case 'select':
            return <SelectField field={field} value={value || ''} onChange={onChange} error={error} />;

        case 'multi-select':
            return <MultiSelectField field={field} value={value || []} onChange={onChange} error={error} />;

        case 'date':
            return <DateField field={field} value={value || ''} onChange={onChange} error={error} />;

        case 'textarea':
            return <TextareaField field={field} value={value || ''} onChange={onChange} error={error} />;

        case 'switch':
            return <SwitchField field={field} value={value || false} onChange={onChange} error={error} />;

        default:
            return <div>Unsupported field type: {field.type}</div>;
    }
}
