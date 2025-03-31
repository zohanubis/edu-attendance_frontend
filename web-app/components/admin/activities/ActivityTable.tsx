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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Sample data for activities
const activities = [
  {
    id: 1,
    name: "Hội thảo Trí tuệ nhân tạo và Machine Learning",
    date: "15/01/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 100
  },
  {
    id: 2,
    name: "Hội thảo Blockchain và Tiền mã hóa",
    date: "22/02/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  },
  {
    id: 3,
    name: "Hội thảo An ninh mạng và Bảo mật thông tin",
    date: "10/03/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  },
  {
    id: 4,
    name: "Hội thảo Phát triển Web hiện đại",
    date: "18/03/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  },
  {
    id: 5,
    name: "Hội thảo Công nghệ phần mềm và Agile",
    date: "29/03/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  },
  {
    id: 6,
    name: "Hội thảo Điện toán đám mây và DevOps",
    date: "25/10/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  },
  {
    id: 7,
    name: "Hội thảo Khoa học dữ liệu và Ứng dụng thực tế",
    date: "05/11/2025",
    time: "2:00 PM",
    duration: "2 giờ",
    venue: 1,
    capacity: 100,
    registered: 0
  }
];

export function ActivityTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm hoạt động..."
          className="max-w-sm"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm hoạt động
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên hoạt động</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Thời lượng</TableHead>
            <TableHead>Điểm rèn luyện</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Đã tham gia</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.name}</TableCell>
              <TableCell>{activity.date}</TableCell>
              <TableCell>{activity.time}</TableCell>
              <TableCell>{activity.duration}</TableCell>
              <TableCell>{activity.venue}</TableCell>
              <TableCell>{activity.capacity}</TableCell>
              <TableCell>
                {activity.registered === 0 ? (
                  `0 / ${activity.capacity}`
                ) : (
                  <Badge variant="default" className="bg-red-500">
                    {activity.registered} / {activity.capacity}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sửa thông tin</DropdownMenuItem>
                    <DropdownMenuItem>Xem sinh viên đăng ký</DropdownMenuItem>
                    <DropdownMenuItem>Xem điểm danh</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa hoạt động</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">Hiển thị 1-7 trong tổng số 7 hoạt động</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm" disabled>
            Tiếp
          </Button>
        </div>
      </div>
    </div>
  );
} 