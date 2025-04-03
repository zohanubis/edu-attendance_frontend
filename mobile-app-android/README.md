# Edu Attendance Mobile App (Android)

## Giới thiệu

Phần Mobile App của dự án Edu Attendance được xây dựng bằng React Native với Expo, dựa trên cấu trúc và chức năng của phiên bản web. Ứng dụng cung cấp giao diện người dùng tối ưu cho thiết bị di động Android, cho phép người dùng truy cập các chức năng chính của hệ thống.

## Cấu trúc thư mục

```
mobile-app-android/
├── app/                # Thư mục chính của ứng dụng (file-based routing)
│   ├── (auth)/         # Các màn hình xác thực
│   ├── (tabs)/         # Các tab chính của ứng dụng
│   ├── activities/     # Màn hình hoạt động
│   ├── student/        # Màn hình dành cho sinh viên
│   ├── union_worker/   # Màn hình dành cho cán bộ đoàn
│   └── admin/          # Màn hình dành cho quản trị viên
├── assets/             # Hình ảnh, font chữ và tài nguyên
├── components/         # React components tái sử dụng
├── constants/          # Các hằng số và cấu hình
├── hooks/              # Custom React hooks
├── services/           # API services
├── store/              # State management
└── types/              # TypeScript type definitions
```

## Cài đặt và Chạy

1. Clone repository và di chuyển vào thư mục mobile-app-android:
```bash
cd edu-attendance_frontend/mobile-app-android
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng trên thiết bị hoặc máy ảo Android:
```bash
npm run android
```

4. Hoặc chạy với Expo:
```bash
npx expo start
```

## Scripts có sẵn

- `npm start`: Khởi động Expo server
- `npm run android`: Chạy ứng dụng trên thiết bị/máy ảo Android
- `npm run ios`: Chạy ứng dụng trên máy ảo iOS (chỉ trên macOS)
- `npm run web`: Chạy phiên bản web của ứng dụng
- `npm run lint`: Kiểm tra lỗi code style

## Công nghệ sử dụng

- **React Native**: Framework cho phát triển ứng dụng di động
- **Expo**: Nền tảng phát triển React Native
- **Expo Router**: Routing dựa trên file
- **TypeScript**: Hỗ trợ type checking
- **React Navigation**: Điều hướng trong ứng dụng

## Tài liệu tham khảo

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
