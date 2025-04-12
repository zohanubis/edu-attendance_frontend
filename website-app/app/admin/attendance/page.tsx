"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, Users, Download, Filter } from "lucide-react"
import Link from "next/link"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AttendancePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [activityType, setActivityType] = useState<string>("all")

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản lý điểm danh</h2>
        <p className="text-muted-foreground">Quản lý điểm danh và công tác đoàn</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" placeholder="Lọc theo thời gian" />
        <Select value={activityType} onValueChange={setActivityType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Loại hoạt động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả hoạt động</SelectItem>
            <SelectItem value="workshop">Hội thảo</SelectItem>
            <SelectItem value="seminar">Seminar</SelectItem>
            <SelectItem value="competition">Cuộc thi</SelectItem>
            <SelectItem value="volunteer">Tình nguyện</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Bộ lọc nâng cao
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lọc theo trạng thái</h4>
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="completed" />
                    <Label htmlFor="completed">Đã hoàn thành</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="upcoming" />
                    <Label htmlFor="upcoming">Sắp diễn ra</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cancelled" />
                    <Label htmlFor="cancelled">Đã hủy</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lọc theo điểm rèn luyện</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-points">Tối thiểu</Label>
                    <Input id="min-points" type="number" min="0" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="max-points">Tối đa</Label>
                    <Input id="max-points" type="number" min="0" className="mt-1" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Áp dụng</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="attendance">Điểm danh</TabsTrigger>
          <TabsTrigger value="youth-union">Công tác đoàn</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Điểm danh hoạt động</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Quản lý điểm danh</div>
                <p className="text-xs text-muted-foreground">Quản lý điểm danh cho các hoạt động và sự kiện</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/activities">Xem hoạt động</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Công tác đoàn</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Quản lý công tác viên</div>
                <p className="text-xs text-muted-foreground">Quản lý thành viên và hoạt động của công tác đoàn</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/attendance/youth-union">Xem công tác viên</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="youth-union" className="pt-4">
          <iframe src="/admin/attendance/youth-union" className="w-full h-[calc(100vh-200px)] border-0"></iframe>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  )
}
