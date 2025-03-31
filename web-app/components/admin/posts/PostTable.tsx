import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample data for posts
const posts = [
  {
    id: 1,
    title: "Trí tuệ nhân tạo và Machine Learning: Ứng dụng thực tế trong đời sống",
    author: "Nguyễn Thanh Tùng",
    publishDate: "15/01/2025 10:00",
    lastEditDate: "15/01/2025 12:30",
    deleted: false
  },
  {
    id: 2,
    title: "Blockchain và Tiền mã hóa: Xu hướng công nghệ trong tương lai",
    author: "Lê Minh Hoàng",
    publishDate: "22/01/2025 09:45",
    lastEditDate: "22/01/2025 11:15",
    deleted: false
  },
  {
    id: 3,
    title: "An ninh mạng và Bảo mật thông tin: Thách thức và giải pháp",
    author: "Phạm Văn Dũng",
    publishDate: "10/01/2025 14:20",
    lastEditDate: "10/01/2025 16:00",
    deleted: true
  },
  {
    id: 4,
    title: "Phát triển Web hiện đại: Công nghệ và xu hướng mới",
    author: "Nguyễn Văn Hùng",
    publishDate: "18/01/2025 08:30",
    lastEditDate: "18/01/2025 10:10",
    deleted: false
  },
  {
    id: 5,
    title: "Điện toán đám mây và DevOps: Ứng dụng trong doanh nghiệp",
    author: "Trần Quốc Bảo",
    publishDate: "25/01/2025 15:00",
    lastEditDate: "25/01/2025 17:30",
    deleted: false
  },
  {
    id: 6,
    title: "Khoa học dữ liệu và AI: Công cụ đắt giá trong phân tích dữ liệu",
    author: "Đỗ Thị Lan",
    publishDate: "05/11/2025 13:45",
    lastEditDate: "05/11/2025 15:20",
    deleted: false
  },
  {
    id: 7,
    title: "Agile và Scrum: Quy trình phát triển phần mềm hiệu quả",
    author: "Nguyễn Hữu Toàn",
    publishDate: "12/01/2025 10:30",
    lastEditDate: "12/01/2025 12:00",
    deleted: false
  },
  {
    id: 8,
    title: "Ứng dụng IoT trong đời sống: Thành phố thông minh và hơn thế nữa",
    author: "Lương Mạnh Hùng",
    publishDate: "20/01/2026 09:00",
    lastEditDate: "20/01/2026 10:45",
    deleted: false
  },
  {
    id: 9,
    title: "Kiến trúc Microservices: Giải pháp mở rộng và tối ưu hệ thống",
    author: "Lê Hoàng Nam",
    publishDate: "15/02/2026 16:00",
    lastEditDate: "15/02/2026 18:00",
    deleted: false
  },
  {
    id: 10,
    title: "AI và Tự động hóa: Tương lai của công nghệ sản xuất",
    author: "Phạm Quang Huy",
    publishDate: "10/03/2026 14:15",
    lastEditDate: "10/03/2026 15:50",
    deleted: false
  }
];

export function PostTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm bài viết..."
          className="max-w-sm"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm bài viết
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead>Chỉnh sửa cuối</TableHead>
            <TableHead>Đã xóa</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.publishDate}</TableCell>
              <TableCell>{post.lastEditDate}</TableCell>
              <TableCell>{post.deleted ? "Xóa" : "Không"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sửa</DropdownMenuItem>
                    <DropdownMenuItem>Xem</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">Hiển thị 1-10 trong tổng số 20 bài viết</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm">
            Tiếp
          </Button>
        </div>
      </div>
    </div>
  );
}