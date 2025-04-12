"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "react-day-picker"

// Mock data for posts
const posts = [
  {
    id: "1",
    title: "Trí tuệ nhân tạo và Machine Learning: Ứng dụng thực tế trong đời sống",
    excerpt:
      "Tìm hiểu về các ứng dụng của AI và Machine Learning trong đời sống hàng ngày và cách chúng đang thay đổi thế giới.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Nguyễn Thanh Tùng",
    date: new Date("2025-01-15"),
    category: "Công nghệ",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Blockchain và Tiền mã hóa: Xu hướng công nghệ trong tương lai",
    excerpt:
      "Khám phá công nghệ Blockchain và cách nó đang định hình lại các giao dịch tài chính và nhiều lĩnh vực khác.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Lê Minh Hoàng",
    date: new Date("2025-01-22"),
    category: "Công nghệ",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "An ninh mạng và Bảo mật thông tin: Thách thức và giải pháp",
    excerpt: "Tìm hiểu về các thách thức trong bảo mật thông tin và cách bảo vệ dữ liệu cá nhân trong thời đại số.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Phạm Văn Dũng",
    date: new Date("2025-01-10"),
    category: "Bảo mật",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Phát triển Web hiện đại: Công nghệ và xu hướng mới",
    excerpt:
      "Khám phá các công nghệ và framework mới nhất trong phát triển web và cách chúng đang thay đổi trải nghiệm người dùng.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Nguyễn Văn Hùng",
    date: new Date("2025-01-18"),
    category: "Web",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Điện toán đám mây và DevOps: Ứng dụng trong doanh nghiệp",
    excerpt:
      "Tìm hiểu về lợi ích của điện toán đám mây và quy trình DevOps trong việc phát triển và triển khai phần mềm.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Trần Quốc Bảo",
    date: new Date("2025-01-25"),
    category: "Cloud",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "6",
    title: "Khoa học dữ liệu và AI: Công cụ đột phá trong phân tích dữ liệu",
    excerpt: "Khám phá cách khoa học dữ liệu và AI đang giúp các tổ chức khai thác giá trị từ dữ liệu lớn.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Đỗ Thị Lan",
    date: new Date("2025-11-05"),
    category: "Data Science",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "Tất cả" },
  { value: "Công nghệ", label: "Công nghệ" },
  { value: "Bảo mật", label: "Bảo mật" },
  { value: "Web", label: "Web" },
  { value: "Cloud", label: "Cloud" },
  { value: "Data Science", label: "Data Science" },
]

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("date-desc")

  // Filter posts based on search query, date range, and category
  const filteredPosts = posts.filter((post) => {
    // Filter by search query
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by date range
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (post.date >= dateRange.from && post.date <= dateRange.to)

    // Filter by category
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesDateRange && matchesCategory
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return b.date.getTime() - a.date.getTime()
      case "date-asc":
        return a.date.getTime() - b.date.getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bài viết</h1>
          <p className="text-muted-foreground">Tin tức và thông báo mới nhất từ trường</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm bài viết..."
              className="pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" placeholder="Lọc theo thời gian" />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Mới nhất</SelectItem>
            <SelectItem value="date-asc">Cũ nhất</SelectItem>
            <SelectItem value="title-asc">Tiêu đề (A-Z)</SelectItem>
            <SelectItem value="title-desc">Tiêu đề (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        {sortedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-lg font-medium">Không tìm thấy bài viết nào</h3>
            <p className="text-muted-foreground">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video h-full w-full overflow-hidden md:aspect-auto">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <CardHeader>
                      <div className="space-y-1">
                        <CardTitle className="line-clamp-2 text-2xl">
                          <Link href={`/posts/${post.id}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(post.date, "dd MMMM, yyyy", { locale: vi })}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex items-center justify-between w-full">
                        <Badge variant="outline">{post.category}</Badge>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/posts/${post.id}`}>Đọc tiếp</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
