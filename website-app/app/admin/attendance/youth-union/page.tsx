"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Edit, Eye, MoreHorizontal, Trash2, UserPlus, Search, Check } from "lucide-react"
import { DeleteDialog } from "@/components/dialogs/delete-dialog"
import { DataTable } from "@/components/ui/data-table-ui"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Member = {
  id: string
  name: string
  class: string
  score: number
  activities: number
  status: "active" | "inactive"
}

type Student = {
  id: string
  name: string
  class: string
  score: number
}

export default function YouthUnionPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name-asc")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [open, setOpen] = useState(false)

  const members: Member[] = [
    {
      id: "2001215836",
      name: "Kong Hoa Hưng",
      class: "12DHT1H01",
      score: 100,
      activities: 0,
      status: "active",
    },
    {
      id: "2001215852",
      name: "Đặng Thị Linh",
      class: "12DHT1H01",
      score: 100,
      activities: 0,
      status: "active",
    },
    {
      id: "2001215975",
      name: "Đặng Bảo Tùng",
      class: "12DHT1H01",
      score: 100,
      activities: 0,
      status: "inactive",
    },
  ]

  // Mock student data for search
  const students: Student[] = [
    { id: "2001215800", name: "Huỳnh Thị An", class: "12DHT1H01", score: 100 },
    { id: "2001215809", name: "Trần Bảo Linh", class: "12DHT1H01", score: 90 },
    { id: "2001215811", name: "Hoàng Văn An", class: "12DHT1H01", score: 80 },
    { id: "2001215816", name: "Hoàng Minh Linh", class: "12DHT1H01", score: 70 },
    { id: "2001215821", name: "Đặng Văn An", class: "12DHT1H01", score: 70 },
    { id: "2001215822", name: "Hoàng Thị Khánh", class: "12DHT1H01", score: 60 },
    { id: "2001215828", name: "Phạm Hồ Đăng Huy", class: "12DHT1H01", score: 100 },
  ]

  const filteredMembers = members.filter((member) => {
    if (statusFilter === "all") return true
    return member.status === statusFilter
  })

  const handleAddMembers = () => {
    console.log("Add members:", selectedStudents)
    setDialogOpen(false)
    setSelectedStudents([])
    // Implementation would add the members to the database
  }

  const handleDeleteMember = (id: string) => {
    console.log("Delete member:", id)
    // Implementation would delete the member from the database
  }

  const toggleStudentSelection = (student: Student) => {
    if (selectedStudents.some((s) => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id))
    } else {
      setSelectedStudents([...selectedStudents, student])
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      !members.some((member) => member.id === student.id) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.includes(searchTerm)),
  )

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "id",
      header: "MSSV",
    },
    {
      accessorKey: "name",
      header: "Họ tên",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "class",
      header: "Lớp",
    },
    {
      accessorKey: "score",
      header: "Điểm rèn luyện",
      cell: ({ row }) => {
        const score = row.getValue("score") as number

        return (
          <div className="flex items-center justify-center w-10 h-6 rounded-full bg-green-100 text-green-800 font-medium">
            {score}
          </div>
        )
      },
    },
    {
      accessorKey: "activities",
      header: "Số hoạt động",
    },
    {
      accessorKey: "status",
      header: "Tình trạng",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.id)}>
                Sao chép MSSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Xem thông tin chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Xem hoạt động đã phân công
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Mở khóa hoạt động
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <DeleteDialog
                  title="Xóa khỏi công tác viên"
                  description="Bạn có chắc chắn muốn xóa thành viên này khỏi danh sách công tác viên? Hành động này không thể hoàn tác."
                  onDelete={() => handleDeleteMember(member.id)}
                  trigger={
                    <div className="flex items-center w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa khỏi công tác viên
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
        <h2 className="text-3xl font-bold tracking-tight">Quản lý công tác viên</h2>
        <p className="text-muted-foreground">Danh sách và quản lý các công tác viên</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tình trạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Tên (A-Z)</SelectItem>
              <SelectItem value="name-desc">Tên (Z-A)</SelectItem>
              <SelectItem value="score-desc">Điểm (Cao-Thấp)</SelectItem>
              <SelectItem value="score-asc">Điểm (Thấp-Cao)</SelectItem>
              <SelectItem value="activities-desc">Hoạt động (Nhiều-Ít)</SelectItem>
              <SelectItem value="activities-asc">Hoạt động (Ít-Nhiều)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Thêm công tác viên
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Thêm công tác viên mới</DialogTitle>
              <DialogDescription>Tìm kiếm sinh viên để thêm vào danh sách công tác viên.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="search-student">Tìm kiếm sinh viên</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-student"
                      placeholder="Nhập MSSV hoặc tên sinh viên"
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-md">
                <div className="p-2 max-h-[200px] overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Không tìm thấy sinh viên phù hợp
                    </div>
                  ) : (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={cn(
                          "flex items-center justify-between rounded-md p-2 cursor-pointer hover:bg-accent",
                          selectedStudents.some((s) => s.id === student.id) && "bg-accent",
                        )}
                        onClick={() => toggleStudentSelection(student)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.id}</div>
                          <div className="text-sm text-muted-foreground">{student.class}</div>
                        </div>
                        {selectedStudents.some((s) => s.id === student.id) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {selectedStudents.length > 0 && (
                <div className="mt-4">
                  <Label>Sinh viên đã chọn</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedStudents.map((student) => (
                      <Badge key={student.id} variant="secondary" className="flex items-center gap-1">
                        {student.name}
                        <button
                          className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                          onClick={() => setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id))}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false)
                  setSelectedStudents([])
                  setSearchTerm("")
                }}
              >
                Hủy
              </Button>
              <Button type="button" onClick={handleAddMembers} disabled={selectedStudents.length === 0}>
                Thêm {selectedStudents.length > 0 ? `(${selectedStudents.length})` : ""}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={filteredMembers}
        searchKey="name"
        searchPlaceholder="Tìm kiếm công tác viên..."
      />
    </div>
  )
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
