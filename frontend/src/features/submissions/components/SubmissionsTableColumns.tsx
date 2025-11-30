import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from '@/shared/components/ui/data-table/DataTableColumnHeader';
import type { Submission } from '../types/submissions.types';
import { Badge } from '@/shared/components/ui/badge';

export function createSubmissionsColumns(): ColumnDef<Submission>[] {
    return [
        {
            accessorKey: 'data.fullName',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Full Name" />
            ),
            cell: ({ row }) => (
                <span className="font-medium text-foreground">{row.original.data.fullName || '-'}</span>
            ),
        },
        {
            accessorKey: 'data.email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.original.data.email || '-'}</span>
            ),
        },
        {
            accessorKey: 'data.dateOfBirth',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date of Birth" />
            ),
            cell: ({ row }) => {
                const date = row.original.data.dateOfBirth;
                return (
                    <span className="text-sm text-muted-foreground">
                        {date ? format(new Date(date), 'MMM dd, yyyy') : '-'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'data.department',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Department" />
            ),
            cell: ({ row }) => (
                <Badge variant="outline" className="capitalize">
                    {row.original.data.department || '-'}
                </Badge>
            ),
        },
        {
            accessorKey: 'data.yearsOfExperience',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Experience" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.original.data.yearsOfExperience ? `${row.original.data.yearsOfExperience} years` : '-'}
                </span>
            ),
        },
        {
            accessorKey: 'data.skills',
            header: 'Skills',
            cell: ({ row }) => {
                const skills = row.original.data.skills;
                if (!skills || skills.length === 0) return <span className="text-muted-foreground">-</span>;

                return (
                    <div className="flex flex-wrap gap-1">
                        {skills.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'data.bio',
            header: 'Bio',
            cell: ({ row }) => {
                const bio = row.original.data.bio;
                return (
                    <span className="text-sm text-muted-foreground max-w-xs truncate block">
                        {bio || '-'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'data.agreeToTerms',
            header: 'Terms',
            cell: ({ row }) => {
                const agreed = row.original.data.agreeToTerms;
                return (
                    <span className={`text-sm font-medium ${agreed ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                        {agreed ? 'Yes' : 'No'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Submitted" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {format(new Date(row.original.createdAt), 'MMM dd, yyyy HH:mm')}
                </span>
            ),
        },
    ];
}
