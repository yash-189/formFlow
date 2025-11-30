import { type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface ContentCardProps {
    children: ReactNode;
    title?: string;
    description?: string;
    actions?: ReactNode;
    footer?: ReactNode;
}

export function ContentCard({
    children,
    title,
    description,
    actions,
    footer
}: ContentCardProps) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            {(title || description || actions) && (
                <CardHeader className="space-y-1">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1.5">
                            {title && <CardTitle className="text-2xl font-semibold">{title}</CardTitle>}
                            {description && (
                                <CardDescription className="text-sm text-slate-600">
                                    {description}
                                </CardDescription>
                            )}
                        </div>
                        {actions && <div className="flex gap-2">{actions}</div>}
                    </div>
                </CardHeader>
            )}
            <CardContent className="pt-6">
                {children}
            </CardContent>
            {footer && (
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
                    {footer}
                </div>
            )}
        </Card>
    );
}
