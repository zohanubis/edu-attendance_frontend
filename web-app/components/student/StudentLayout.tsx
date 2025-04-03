"use client";

import { Sidebar } from '@/components/layout/Sidebar';
import { MainLayout } from '@/components/layout/MainLayout';

interface StudentLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'union_worker';
}

export function StudentLayout({ children, userRole = 'student' }: StudentLayoutProps) {
  return (
    <MainLayout userRole="student" sidebar={<Sidebar userRole={userRole} />}>
      {children}
    </MainLayout>
  )
}