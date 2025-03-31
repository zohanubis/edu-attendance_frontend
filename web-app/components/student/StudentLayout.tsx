import { MainLayout } from '@/components/layout/MainLayout';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <MainLayout userRole="student">
      {children}
    </MainLayout>
  );
} 