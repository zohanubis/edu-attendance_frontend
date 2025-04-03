"use client";

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Giả lập đăng nhập thành công
      // Trong thực tế, bạn sẽ gọi API đăng nhập ở đây
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Giả lập lưu token vào cookie
      document.cookie = `auth-token=example-token; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 ngày
      
      // Chuyển hướng dựa trên vai trò người dùng
      // Trong thực tế, vai trò sẽ được xác định từ phản hồi API
      if (email.includes('admin')) {
        router.push('/admin/dashboard');
      } else if (email.includes('union')) {
        router.push('/union_worker');
      } else {
        router.push('/student');
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập thông tin đăng nhập của bạn để truy cập vào hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-6 pt-0">
          <div className="text-sm text-muted-foreground text-center">
            <span>Gợi ý đăng nhập:</span>
            <ul className="mt-2 text-left">
              <li>- Admin: admin@example.com</li>
              <li>- Union Worker: union@example.com</li>
              <li>- Student: student@example.com</li>
              <li>- Mật khẩu: bất kỳ</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}