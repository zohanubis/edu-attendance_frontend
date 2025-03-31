import { MainLayout } from '@/components/layout/MainLayout';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <MainLayout userRole={null}>
      {children}
    </MainLayout>
  );
} 