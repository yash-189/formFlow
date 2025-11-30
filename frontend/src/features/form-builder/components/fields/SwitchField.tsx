import { Switch } from '@/shared/components/ui/switch';
import { Label } from '@/shared/components/ui/label';
import type { FormField } from '../../types/form-schema.types';

interface SwitchFieldProps {
    field: FormField;
    value: boolean;
    onChange: (value: boolean) => void;
    error?: string;
}

export function SwitchField({ field, value, onChange, error }: SwitchFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Switch
                    id={field.id}
                    checked={value}
                    onCheckedChange={onChange}
                />
                <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
