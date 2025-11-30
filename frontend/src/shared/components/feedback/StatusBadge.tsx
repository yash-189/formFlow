import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-slate-100 text-slate-900',
                success: 'bg-emerald-100 text-emerald-900',
                warning: 'bg-amber-100 text-amber-900',
                error: 'bg-rose-100 text-rose-900',
                info: 'bg-blue-100 text-blue-900',
                violet: 'bg-violet-100 text-violet-900',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
    className?: string;
}

export function StatusBadge({ variant, className, children }: StatusBadgeProps) {
    return <span className={badgeVariants({ variant, className })}>{children}</span>;
}
