import { FormFieldWrapper } from '@/shared/components/form/FormFieldWrapper';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shared/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';
import type { FormField } from '../../types/form-schema.types';

interface MultiSelectFieldProps {
    field: FormField
    value: string[]
    onChange: (value: string[]) => void
    error?: string
}

export function MultiSelectField({ field, value = [], onChange, error }: MultiSelectFieldProps) {
    const [open, setOpen] = useState(false)

    const handleSelect = (currentValue: string) => {
        if (!value.includes(currentValue)) {
            onChange([...value, currentValue])
        } else {
            onChange(value.filter((v) => v !== currentValue))
        }
    }

    const handleRemove = (valueToRemove: string) => {
        onChange(value.filter((v) => v !== valueToRemove))
    }

    const selectedOptions = field.options?.filter((option) => value.includes(option.value)) || []

    return (
        <FormFieldWrapper label={field.label} required={field.required} error={error} htmlFor={field.id}>
            <div className="space-y-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between font-normal bg-transparent"
                        >
                            {selectedOptions.length > 0
                                ? `${selectedOptions.length} selected`
                                : field.placeholder || "Select options..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                        <Command>
                            <CommandInput placeholder={`Search ${field.label.toLowerCase()}...`} />
                            <CommandList>
                                <CommandEmpty>No option found.</CommandEmpty>
                                <CommandGroup>
                                    {field.options?.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onSelect={() => handleSelect(option.value)}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                className={cn("mr-2 h-4 w-4", value.includes(option.value) ? "opacity-100" : "opacity-0")}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {selectedOptions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedOptions.map((option) => (
                            <Badge key={option.value} variant="secondary" className="gap-1 pr-1">
                                {option.label}
                                <button
                                    type="button"
                                    onClick={() => handleRemove(option.value)}
                                    className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </FormFieldWrapper>
    )
}
