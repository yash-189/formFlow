import { Link, useLocation } from 'react-router-dom';
import { FileText, ListChecks } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';
import { ModeToggle } from '@/shared/components/mode-toggle';
import { cn } from '@/shared/utils';

export function Navigation() {
    const location = useLocation();

    const navItems = [
        { path: ROUTES.FORM, label: 'Form', icon: FileText },
        { path: ROUTES.SUBMISSIONS, label: 'Submissions', icon: ListChecks },
    ];

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src="/favicon.png" alt="FormFlow Logo" className="w-8 h-8 rounded-lg" />
                        <span className="text-lg font-semibold text-foreground">FormFlow</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                                            isActive
                                                ? "bg-secondary text-secondary-foreground font-medium"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="h-6 w-px bg-border" />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
