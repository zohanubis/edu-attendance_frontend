"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { PostDialog } from "@/components/dialogs/post-dialog"
import { DeleteDialog } from "@/components/dialogs/delete-dialog"
import { DataTable } from "@/components/ui/data-table-ui"
import type { ColumnDef } from "@tanstack/react-table"

type Post = {
  id: number
  title: string
  author: string
  publishDate: string
  lastEdit: string
  deleted: boolean
}

export default function PostsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [sortBy, setSortBy] = useState<string>("date-desc")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const posts: Post[] = [
    {
      id: 1,
      title: "Trí tuệ nhân tạo và Machine Learning: Ứng dụng thực tế trong đời sống",
      author: "Nguyễn Thanh Tùng",
      publishDate: "15/01/2025 10:00",
      lastEdit: "15/01/2025 12:30",
      deleted: false,
    },
    {
      id: 2,
      title: "Blockchain và Tiền mã hóa: Xu hướng công nghệ trong tương lai",
      author: "Lê Minh Hoàng",
      publishDate: "22/01/2025 09:45",
      lastEdit: "22/01/2025 11:15",
      deleted: false,
    },
    {
      id: 3,
      title: "An ninh mạng và Bảo mật thông tin: Thách thức và giải pháp",
      author: "Phạm Văn Dũng",
      publishDate: "10/01/2025 14:20",
      lastEdit: "10/01/2025 16:00",
      deleted: true,
    },
    {
      id: 4,
      title: "Phát triển Web hiện đại: Công nghệ và xu hướng mới",
      author: "Nguyễn Văn Hùng",
      publishDate: "18/01/2025 08:30",
      lastEdit: "18/01/2025 10:10",
      deleted: false,
    },
    {
      id: 5,
      title: "Điện toán đám mây và DevOps: Ứng dụng trong doanh nghiệp",
      author: "Trần Quốc Bảo",
      publishDate: "25/01/2025 15:00",
      lastEdit: "25/01/2025 17:30",
      deleted: false,
    },
    {
      id: 6,
      title: "Khoa học dữ liệu và AI: Công cụ đột phá trong phân tích dữ liệu",
      author: "Đỗ Thị Lan",
      publishDate: "05/11/2025 13:45",
      lastEdit: "05/11/2025 15:20",
      deleted: false,
    },
    {
      id: 7,
      title: "Agile và Scrum: Quy trình phát triển phần mềm hiệu quả",
      author: "Nguyễn Hữu Toàn",
      publishDate: "12/01/2025 10:30",
      lastEdit: "12/01/2025 12:00",
      deleted: false,
    },
    {
      id: 8,
      title: "Ứng dụng IoT trong đời sống: Thành phố thông minh và hơn thế nữa",
      author: "Lương Mạnh Hùng",
      publishDate: "20/01/2026 09:00",
      lastEdit: "20/01/2026 10:45",
      deleted: false,
    },
    {
      id: 9,
      title: "Kiến trúc Microservices: Giải pháp mở rộng và tối ưu hệ thống",
      author: "Lê Hoàng Nam",
      publishDate: "15/02/2026 16:00",
      lastEdit: "15/02/2026 18:00",
      deleted: false,
    },
    {
      id: 10,
      title: "AI và Tự động hóa: Tương lai của công nghệ sản xuất",
      author: "Phạm Quang Huy",
      publishDate: "10/03/2026 14:15",
      lastEdit: "10/03/2026 15:50",
      deleted: false,
    },
  ]

  const filteredPosts = posts.filter((post) => {
    if (filterStatus === "all") return true
    if (filterStatus === "active") return !post.deleted
    if (filterStatus === "deleted") return post.deleted
    return true
  })

  const handleAddPost = (data: any) => {
    console.log("Add post:", data)
    // Implementation would add the post to the database
  }

  const handleEditPost = (data: any) => {
    console.log("Edit post:", data)
    // Implementation would update the post in the database
  }

  const handleDeletePost = (id: number) => {
    console.log("Delete post:", id)
    // Implementation would delete the post from the database
  }

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: "Tiêu đề",
      cell: ({ row }) => <div className="font-medium max-w-md truncate">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "author",
      header: "Tác giả",
    },
    {
      accessorKey: "publishDate",
      header: "Ngày đăng",
    },
    {
      accessorKey: "lastEdit",
      header: "Chỉnh sửa cuối",
    },
    {
      accessorKey: "deleted",
      header: "Đã xóa",
      cell: ({ row }) => {
        const deleted = row.getValue("deleted") as boolean

        return deleted ? "Có" : "Không"
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.id.toString())}>
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Xem bài viết
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PostDialog
                  type="edit"
                  post={{
                    id: post.id,
                    title: post.title,
                    author: post.author,
                    content: "Nội dung bài viết sẽ được tải từ cơ sở dữ liệu",
                  }}
                  onSubmit={handleEditPost}
                  trigger={
                    <div className="flex items-center w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Sửa bài viết
                    </div>
                  }
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <DeleteDialog
                  title="Xóa bài viết"
                  description="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
                  onDelete={() => handleDeletePost(post.id)}
                  trigger={
                    <div className="flex items-center w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa bài viết
                    </div>
                  }
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản lý bài viết</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Ngày (Mới nhất)</SelectItem>
              <SelectItem value="date-asc">Ngày (Cũ nhất)</SelectItem>
              <SelectItem value="title-asc">Tiêu đề (A-Z)</SelectItem>
              <SelectItem value="title-desc">Tiêu đề (Z-A)</SelectItem>
              <SelectItem value="author-asc">Tác giả (A-Z)</SelectItem>
              <SelectItem value="author-desc">Tác giả (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hiển thị</SelectItem>
              <SelectItem value="deleted">Đã xóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PostDialog
          type="add"
          onSubmit={handleAddPost}
          trigger={
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm bài viết
            </Button>
          }
        />
      </div>

      <DataTable columns={columns} data={filteredPosts} searchKey="title" searchPlaceholder="Tìm kiếm bài viết..." />
    </div>
  )
}
