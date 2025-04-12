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
import { ActivityDialog } from "@/components/dialogs/activity-dialog"
import { DeleteDialog } from "@/components/dialogs/delete-dialog"
import { DataTable } from "@/components/ui/data-table-ui"
import type { ColumnDef } from "@tanstack/react-table"

type Activity = {
  id: number
  name: string
  date: string
  time: string
  duration: string
  location: string
  capacity: number
  registered: number
}

export default function ActivitiesPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [sortBy, setSortBy] = useState<string>("date-desc")

  const activities: Activity[] = [
    {
      id: 1,
      name: "Hội thảo Trí tuệ nhân tạo và Machine Learning",
      date: "15/01/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 100,
    },
    {
      id: 2,
      name: "Hội thảo Blockchain và Tiền mã hóa",
      date: "22/02/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
    {
      id: 3,
      name: "Hội thảo An ninh mạng và Bảo mật thông tin",
      date: "10/03/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
    {
      id: 4,
      name: "Hội thảo Phát triển Web hiện đại",
      date: "18/03/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
    {
      id: 5,
      name: "Hội thảo Công nghệ phần mềm và Agile",
      date: "29/03/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
    {
      id: 6,
      name: "Hội thảo Điện toán đám mây và DevOps",
      date: "25/10/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
    {
      id: 7,
      name: "Hội thảo Khoa học dữ liệu và Ứng dụng thực tế",
      date: "05/11/2025",
      time: "2:00 PM",
      duration: "2 giờ",
      location: "1",
      capacity: 100,
      registered: 0,
    },
  ]

  const handleAddActivity = (data: any) => {
    console.log("Add activity:", data)
    // Implementation would add the activity to the database
  }

  const handleEditActivity = (data: any) => {
    console.log("Edit activity:", data)
    // Implementation would update the activity in the database
  }

  const handleDeleteActivity = (id: number) => {
    console.log("Delete activity:", id)
    // Implementation would delete the activity from the database
  }

  const columns: ColumnDef<Activity>[] = [
    {
      accessorKey: "name",
      header: "Tên hoạt động",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "date",
      header: "Ngày",
    },
    {
      accessorKey: "time",
      header: "Thời gian",
    },
    {
      accessorKey: "duration",
      header: "Thời lượng",
    },
    {
      accessorKey: "location",
      header: "Điểm rèn luyện",
    },
    {
      accessorKey: "capacity",
      header: "Số lượng",
    },
    {
      accessorKey: "registered",
      header: "Đã tham gia",
      cell: ({ row }) => {
        const registered = row.getValue("registered") as number
        const capacity = row.getValue("capacity") as number

        return (
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${registered > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}
          >
            {registered} / {capacity}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const activity = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(activity.id.toString())}>
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Xem sinh viên đăng ký
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ActivityDialog
                  type="edit"
                  activity={{
                    id: activity.id,
                    name: activity.name,
                    date: new Date(),
                    time: activity.time,
                    duration: activity.duration,
                    location: activity.location,
                    capacity: activity.capacity,
                    description: "",
                  }}
                  onSubmit={handleEditActivity}
                  trigger={
                    <div className="flex items-center w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Sửa thông tin
                    </div>
                  }
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <DeleteDialog
                  title="Xóa hoạt động"
                  description="Bạn có chắc chắn muốn xóa hoạt động này? Hành động này không thể hoàn tác."
                  onDelete={() => handleDeleteActivity(activity.id)}
                  trigger={
                    <div className="flex items-center w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa hoạt động
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
        <h2 className="text-3xl font-bold tracking-tight">Quản lý hoạt động</h2>
        <p className="text-muted-foreground">Danh sách và quản lý các hoạt động</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Ngày (Mới nhất)</SelectItem>
              <SelectItem value="date-asc">Ngày (Cũ nhất)</SelectItem>
              <SelectItem value="name-asc">Tên (A-Z)</SelectItem>
              <SelectItem value="name-desc">Tên (Z-A)</SelectItem>
              <SelectItem value="registered-desc">Đăng ký (Cao-Thấp)</SelectItem>
              <SelectItem value="registered-asc">Đăng ký (Thấp-Cao)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ActivityDialog
          type="add"
          onSubmit={handleAddActivity}
          trigger={
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm hoạt động
            </Button>
          }
        />
      </div>

      <DataTable columns={columns} data={activities} searchKey="name" searchPlaceholder="Tìm kiếm hoạt động..." />
    </div>
  )
}
