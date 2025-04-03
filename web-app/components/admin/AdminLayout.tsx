"use client";

import { Sidebar } from '@/components/layout/Sidebar';
import { MainLayout } from '@/components/layout/MainLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <MainLayout userRole="admin" sidebar={<Sidebar userRole="admin" />}>
      {children}
    </MainLayout>
  );
}