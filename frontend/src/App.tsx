import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from '@/shared/constants/routes';
import { Navigation } from '@/components/Navigation';
import { ThemeProvider } from '@/shared/components/theme-provider';
import HomePage from '@/pages/HomePage';
import FormPage from '@/pages/FormPage';
import SubmissionsPage from '@/pages/SubmissionsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navigation />
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.FORM} element={<FormPage />} />
              <Route path={ROUTES.SUBMISSIONS} element={<SubmissionsPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
