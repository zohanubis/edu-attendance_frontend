import { MainLayout } from '@/components/layout/MainLayout';

interface UnionWorkerLayoutProps {
  children: React.ReactNode;
}

export function UnionWorkerLayout({ children }: UnionWorkerLayoutProps) {
  return (
    <MainLayout userRole="union_worker">
      {children}
    </MainLayout>
  );
} 