import { Header } from '@/components/layout/Header';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'union_worker' | 'admin' | null;
}

export function MainLayout({ children, userRole }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header userRole={userRole} />
      <main className="flex-1 container py-8">
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EDU Attendance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 