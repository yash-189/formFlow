import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';

export default function HomePage() {
    return (
        <div className="min-h-[90vh] bg-background flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center space-y-12">
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground">
                        FormFlow
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                        Streamlined form building and submission management.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button asChild size="lg" className="h-14 px-10 text-lg font-medium rounded-full transition-all hover:scale-105">
                        <Link to={ROUTES.FORM}>
                            Try Now
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="h-14 px-10 text-lg font-medium rounded-full bg-accent/50 hover:bg-accent/90">
                        <Link to={ROUTES.SUBMISSIONS}>
                            View Submissions
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
