"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Xóa token xác thực
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    // Chuyển hướng về trang chủ sau 2 giây
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <AuthLayout>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Đăng xuất</CardTitle>
          <CardDescription>
            Bạn đã đăng xuất thành công
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <p>Đang chuyển hướng về trang chủ...</p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}