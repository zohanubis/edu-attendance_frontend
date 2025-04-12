import type { Metadata } from "next"
import Image from "next/image"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào hệ thống quản lý hoạt động sinh viên",
}

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src=""
            fill
            alt="HUIT Campus"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
            alt="HUIT Logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"Hệ thống quản lý hoạt động sinh viên - Trường Đại học Công nghiệp TP.HCM"</p>
            <footer className="text-sm">Phòng Công tác Sinh viên</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground">Nhập thông tin đăng nhập của bạn để tiếp tục</p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
