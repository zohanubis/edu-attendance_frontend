"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export default function StudentsPage() {
  const students = [
    {
      id: "2001215800",
      name: "Huỳnh Thị An",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 100,
      activities: 1,
    },
    {
      id: "2001215809",
      name: "Trần Bảo Linh",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 90,
      activities: 1,
    },
    {
      id: "2001215811",
      name: "Hoàng Văn An",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 80,
      activities: 1,
    },
    {
      id: "2001215816",
      name: "Hoàng Minh Linh",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 70,
      activities: 2,
    },
    {
      id: "2001215821",
      name: "Đặng Văn An",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 70,
      activities: 2,
    },
    {
      id: "2001215822",
      name: "Hoàng Thị Khánh",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 60,
      activities: 3,
    },
    {
      id: "2001215828",
      name: "Phạm Hồ Đăng Huy",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 100,
      activities: 1,
    },
    {
      id: "2001215836",
      name: "Kong Hoa Hưng",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 100,
      activities: 1,
    },
    {
      id: "2001215842",
      name: "Hoàng Bảo Hạnh",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 70,
      activities: 0,
    },
    {
      id: "2001215852",
      name: "Đặng Thị Linh",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 100,
      activities: 0,
    },
    {
      id: "2001215856",
      name: "Võ Hồng Dũng",
      class: "12DHT1H01",
      department: "Information Technology",
      score: 100,
      activities: 0,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản lý sinh viên</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Tìm kiếm sinh viên..." />
        </div>
        <Button variant="outline" onClick={() => {}}>
          Tất cả
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>MSSV</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead>Khoa</TableHead>
              <TableHead>Điểm rèn luyện</TableHead>
              <TableHead>Tổng số hoạt động</TableHead>
              <TableHead>Tác vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.score}</TableCell>
                <TableCell>{student.activities}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
