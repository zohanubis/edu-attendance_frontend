"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { DateRange } from "react-day-picker"

// Mock data for activities
const activities = [
  {
    id: "1",
    title: "Hội thảo Trí tuệ nhân tạo và Machine Learning",
    description: "Tham gia hội thảo để tìm hiểu về các ứng dụng của AI và Machine Learning trong thực tế.",
    date: new Date("2025-01-15"),
    time: "14:00",
    location: "Hội trường A",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 100,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Hội thảo Blockchain và Tiền mã hóa",
    description: "Tìm hiểu về công nghệ Blockchain và ứng dụng của nó trong các lĩnh vực khác nhau.",
    date: new Date("2025-02-22"),
    time: "14:00",
    location: "Hội trường B",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 80,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Hội thảo An ninh mạng và Bảo mật thông tin",
    description: "Tìm hiểu về các vấn đề an ninh mạng và cách bảo vệ thông tin cá nhân trên internet.",
    date: new Date("2025-03-10"),
    time: "14:00",
    location: "Hội trường C",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 50,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Hội thảo Phát triển Web hiện đại",
    description: "Tìm hiểu về các công nghệ và framework mới nhất trong phát triển web.",
    date: new Date("2025-03-18"),
    time: "14:00",
    location: "Hội trường A",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 70,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Hội thảo Công nghệ phần mềm và Agile",
    description: "Tìm hiểu về quy trình phát triển phần mềm Agile và các phương pháp quản lý dự án hiệu quả.",
    date: new Date("2025-03-29"),
    time: "14:00",
    location: "Hội trường B",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 60,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "6",
    title: "Hội thảo Điện toán đám mây và DevOps",
    description: "Tìm hiểu về các dịch vụ điện toán đám mây và quy trình DevOps trong phát triển phần mềm.",
    date: new Date("2025-10-25"),
    time: "14:00",
    location: "Hội trường C",
    category: "Hội thảo",
    points: 1,
    capacity: 100,
    registered: 40,
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "Tất cả" },
  { value: "Hội thảo", label: "Hội thảo" },
  { value: "Seminar", label: "Seminar" },
  { value: "Cuộc thi", label: "Cuộc thi" },
  { value: "Tình nguyện", label: "Tình nguyện" },
]

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  // Filter activities based on search query, date range, and category
  const filteredActivities = activities.filter((activity) => {
    // Filter by search query
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by date range
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (activity.date >= dateRange.from && activity.date <= dateRange.to)

    // Filter by category
    const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory

    return matchesSearch && matchesDateRange && matchesCategory
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hoạt động</h1>
          <p className="text-muted-foreground">Khám phá và đăng ký tham gia các hoạt động của trường</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm hoạt động..."
              className="pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" placeholder="Lọc theo thời gian" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value} className="rounded-md">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedCategory} className="mt-0">
          {filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium">Không tìm thấy hoạt động nào</h3>
              <p className="text-muted-foreground">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1 text-xl">
                        <Link href={`/activities/${activity.id}`} className="hover:underline">
                          {activity.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(activity.date, "dd MMMM, yyyy", { locale: vi })}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{activity.time}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{activity.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{activity.category}</Badge>
                      <Badge>{activity.points} điểm</Badge>
                    </div>
                    <div className="text-sm">
                      {activity.registered}/{activity.capacity}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
