import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';

interface DataTableToolbarProps {
    customButton?: React.ReactNode;
    globalFilter?: string;
    onGlobalFilterChange?: (value: string) => void;
    enableGlobalFilter?: boolean;
}

export function DataTableToolbar({
    customButton,
    globalFilter,
    onGlobalFilterChange,
    enableGlobalFilter = false,
}: DataTableToolbarProps) {
    return (
        <div className="flex items-center justify-between gap-4 px-2 py-4">
            <div className="flex flex-1 items-center space-x-2">
                {enableGlobalFilter && onGlobalFilterChange && (
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={globalFilter ?? ''}
                            onChange={(e) => onGlobalFilterChange(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                )}
            </div>
            {customButton && <div className="flex items-center gap-2">{customButton}</div>}
        </div>
    );
}
