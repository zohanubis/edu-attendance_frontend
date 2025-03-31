import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample data for students
const students = [
  {
    id: 1,
    mssv: "2001215800",
    name: "Huỳnh Thị An",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 100,
    activities: 1
  },
  {
    id: 2,
    mssv: "2001215809",
    name: "Trần Bảo Linh",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 90,
    activities: 1
  },
  {
    id: 3,
    mssv: "2001215811",
    name: "Hoàng Văn An",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 80,
    activities: 1
  },
  {
    id: 4,
    mssv: "2001215816",
    name: "Hoàng Minh Linh",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 70,
    activities: 2
  },
  {
    id: 5,
    mssv: "2001215821",
    name: "Đặng Văn An",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 70,
    activities: 2
  },
  {
    id: 6,
    mssv: "2001215822",
    name: "Hoàng Thị Khánh",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 60,
    activities: 3
  },
  {
    id: 7,
    mssv: "2001215828",
    name: "Phạm Hồ Đăng Huy",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 100,
    activities: 1
  },
  {
    id: 8,
    mssv: "2001215836",
    name: "Kong Hòa Hưng",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 100,
    activities: 1
  },
  {
    id: 9,
    mssv: "2001215842",
    name: "Hoàng Bảo Hạnh",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 70,
    activities: 0
  },
  {
    id: 10,
    mssv: "2001215852",
    name: "Đặng Thị Linh",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 100,
    activities: 0
  },
  {
    id: 11,
    mssv: "2001215856",
    name: "Võ Hồng Đông",
    class: "12DHTH01",
    faculty: "Information Technology",
    points: 100,
    activities: 0
  }
];

export function StudentTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sinh viên..."
            className="pl-8"
          />
        </div>
      </div>
      
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
              <TableCell>{student.mssv}</TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.faculty}</TableCell>
              <TableCell>{student.points}</TableCell>
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
  );
}