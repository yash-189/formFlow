// Type definitions for form schema
export type FieldType =
    | 'text'
    | 'number'
    | 'select'
    | 'multi-select'
    | 'date'
    | 'textarea'
    | 'switch';

export interface ValidationRule {
    minLength?: number;
    maxLength?: number;
    regex?: string;
    min?: number;
    max?: number;
    minDate?: string;
    minSelected?: number;
    maxSelected?: number;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: SelectOption[];
    validation?: ValidationRule;
}

export interface FormSchema {
    _id: string;
    title: string;
    description: string;
    fields: FormField[];
}
