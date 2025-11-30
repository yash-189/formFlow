import { type ReactNode } from 'react';

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
};

export function PageLayout({
    children,
    title,
    description,
    maxWidth = '7xl'
}: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className={`container mx-auto px-4 py-8 ${maxWidthClasses[maxWidth]}`}>
                {(title || description) && (
                    <div className="mb-8">
                        {title && (
                            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-lg text-muted-foreground max-w-3xl">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
