# Edu Attendance Frontend

## Giới thiệu

Phần Frontend của dự án Edu Attendance được xây dựng bằng Next.js 15.2.4, React 18 và TypeScript 5.6.3. Dự án sử dụng các công nghệ hiện đại để tạo ra một giao diện người dùng mượt mà và thân thiện.

## Cấu trúc thư mục

```
edu-attendance_frontend/
├── web-app/               # Thư mục chính của ứng dụng
    ├── app/              # Route handlers và page components
    ├── components/       # React components tái sử dụng
    ├── config/          # Cấu hình ứng dụng
    ├── hooks/           # Custom React hooks
    ├── lib/             # Thư viện và utilities
    ├── services/        # API services
    ├── store/           # State management
    └── types/           # TypeScript type definitions
```

## Cài đặt và Chạy

1. Clone repository và di chuyển vào thư mục frontend:
```bash
cd edu-attendance_frontend/web-app
```

2. Cài đặt dependencies:
```bash
pnpm install
```

3. Chạy môi trường development:
```bash
pnpm dev
```

4. Build và chạy môi trường production:
```bash
pnpm build
pnpm start
```

## Scripts có sẵn

- `pnpm dev`: Chạy ứng dụng ở môi trường development
- `pnpm build`: Build ứng dụng cho production
- `pnpm start`: Chạy ứng dụng đã được build
- `pnpm lint`: Kiểm tra lỗi code style
- `pnpm format`: Format code theo chuẩn của dự án

## Công nghệ sử dụng

- **Next.js 15.2.4**: Framework React cho production
- **React 18**: Thư viện UI
- **TypeScript 5.6.3**: Hỗ trợ type checking
- **ESLint**: Linting tool
- **Prettier**: Code formatter
- **TailwindCSS**: Utility-first CSS framework

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)