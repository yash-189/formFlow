import * as React from "react"
import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import type { FormField } from '../../types/form-schema.types';
import { cn } from '@/shared/utils';
import { ChevronDownIcon } from "lucide-react";

interface DateFieldProps {
    field: FormField
    value: string
    onChange: (value: string) => void
    error?: string
}

export function DateField({ field, value, onChange, error }: DateFieldProps) {
    const [open, setOpen] = React.useState(false)
    const date = value ? new Date(value) : undefined

    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const offset = selectedDate.getTimezoneOffset()
            const localDate = new Date(selectedDate.getTime() - offset * 60 * 1000)
            onChange(localDate.toISOString().split("T")[0])
        } else {
            onChange("")
        }
        setOpen(false)
    }

    return (
        <FormFieldWrapper label={field.label} required={field.required} error={error} htmlFor={field.id}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-between font-normal bg-transparent",
                            !date && "text-muted-foreground",
                            error && "border-destructive",
                        )}
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        captionLayout="dropdown"
                        disabled={(date) => {
                            if (field.validation?.minDate) {
                                const minDate = new Date(field.validation.minDate)
                                if (date < minDate) return true
                            }
                            return false
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </FormFieldWrapper>
    )
}
