"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Percent, Calendar, Download } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, PieChart } from "@/components/ui/charts-ui"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [chartType, setChartType] = useState<string>("bar")

  // Data for the charts
  const registrationData = {
    registered: 200,
    available: 100,
  }

  const activityTypeData = [
    { name: "Hội thảo", total: 3, registered: 150 },
    { name: "Seminar", total: 2, registered: 50 },
    { name: "Cuộc thi", total: 1, registered: 0 },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Admin</h2>
          <p className="text-muted-foreground">Thống kê và quản lý các hoạt động tháng 3 năm 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số hoạt động</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 p-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số đăng ký</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 p-2">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              200 <span className="text-sm font-normal text-muted-foreground">/ 300</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số chỗ còn trống</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-100 p-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỉ lệ đăng ký</CardTitle>
            <div className="h-10 w-10 rounded-full bg-orange-100 p-2">
              <Percent className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">66.7%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Biểu đồ tỉ lệ đăng ký</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất dữ liệu
            </Button>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                { name: "Đã đăng ký", value: registrationData.registered, color: "hsl(215, 100%, 50%)" },
                { name: "Còn trống", value: registrationData.available, color: "hsl(30, 100%, 50%)" },
              ]}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thống kê theo loại hoạt động</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Loại biểu đồ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Cột</SelectItem>
                  <SelectItem value="line">Đường</SelectItem>
                  <SelectItem value="pie">Tròn</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Xuất
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart
              data={activityTypeData}
              categories={["total", "registered"]}
              index="name"
              colors={["hsl(270, 70%, 60%)", "hsl(145, 70%, 50%)"]}
              valueFormatter={(value) => `${value} chỗ`}
              yAxisWidth={48}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
