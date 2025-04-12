import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6 text-center">
        <img
          src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
          alt="HUIT Logo"
          className="h-20 w-auto"
        />
        <h1 className="text-4xl font-bold tracking-tight">404 - Không tìm thấy trang</h1>
        <p className="text-muted-foreground">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang chủ
          </Link>
        </Button>
      </div>
    </div>
  )
}
