import { Redirect } from 'expo-router';

export default function Index() {
  // Chuyển hướng người dùng đến trang đăng nhập khi mở ứng dụng
  return <Redirect href="/(auth)/login" />;
}