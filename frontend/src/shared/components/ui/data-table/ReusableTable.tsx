import type { ColumnDef, SortingState, OnChangeFn } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';

interface ReusableTableProps<TData> {
    title?: string;
    columns: ColumnDef<TData>[];
    data: TData[];
    totalItems: number;
    pageCount: number;
    pageSize: number;
    pageIndex: number;
    onPageChange: (pageIndex: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    sorting?: SortingState;
    onSortingChange?: OnChangeFn<SortingState>;
    customButton?: React.ReactNode;
    enableGlobalFilter?: boolean;
    globalFilter?: string;
    onGlobalFilterChange?: (value: string) => void;
}

export function ReusableTable<TData>({
    title,
    columns,
    data,
    totalItems,
    pageCount,
    pageSize,
    pageIndex,
    onPageChange,
    onPageSizeChange,
    sorting = [],
    onSortingChange,
    customButton,
    enableGlobalFilter = false,
    globalFilter = '',
    onGlobalFilterChange,
}: ReusableTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            sorting,
            pagination: { pageIndex, pageSize },
        },
        onSortingChange,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
    });

    return (
        <div className="space-y-4">
            {title && (
                <h4 className="font-semibold capitalize">
                    {title}
                </h4>
            )}

            {(customButton || enableGlobalFilter) && (
                <DataTableToolbar
                    customButton={customButton}
                    globalFilter={globalFilter}
                    onGlobalFilterChange={onGlobalFilterChange}
                    enableGlobalFilter={enableGlobalFilter}
                />
            )}

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="hover:bg-slate-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-nowrap">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination
                totalItems={totalItems}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        </div>
    );
}
