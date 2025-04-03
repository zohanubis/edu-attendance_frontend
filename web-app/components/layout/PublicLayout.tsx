import { Navbar } from '@/components/layout/Navbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar userRole={null} />
      <main className="flex-1 container py-8 px-4 md:px-6 lg:px-8 mx-auto max-w-6xl">
        <div className="flex flex-col items-center w-full">
          {children}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}