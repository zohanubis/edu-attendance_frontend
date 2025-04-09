"use client";

import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar, CheckCircle2 } from 'lucide-react';

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isUnionWorker, setIsUnionWorker] = useState(false);
  
  // Kiểm tra xem sinh viên có phải là cán bộ đoàn không
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy thông tin này
    const checkUnionWorkerStatus = async () => {
      // const response = await fetch('/api/student/profile');
      // const data = await response.json();
      // setIsUnionWorker(data.isUnionWorker);
      
      // Tạm thời sử dụng giá trị cứng để demo
      setIsUnionWorker(true);
    };
    
    checkUnionWorkerStatus();
  }, []);
  
  // Mẫu dữ liệu sinh viên
  const students = [
    { id: '2001215809', name: 'Trần Bảo Linh', class: '12DHT01', status: true },
    { id: '2001215811', name: 'Hoàng Văn An', class: '12DHT01', status: true },
    { id: '2001215816', name: 'Hoàng Minh Linh', class: '12DHT01', status: true },
    { id: '2001215821', name: 'Đặng Văn An', class: '12DHT01', status: true },
    { id: '2001215822', name: 'Hoàng Thị Khánh', class: '12DHT01', status: true },
    { id: '2001215828', name: 'Phạm Hồ Đăng Huy', class: '12DHT01', status: true },
    { id: '2001215836', name: 'Kong Hoa Hùng', class: '12DHT01', status: true },
    { id: '2001215842', name: 'Hoàng Bảo Hạnh', class: '12DHT01', status: false },
    { id: '2001215852', name: 'Đặng Thị Linh', class: '12DHT01', status: true },
    { id: '2001215856', name: 'Võ Hồng Dũng', class: '12DHT01', status: false },
  ];

  // Mẫu dữ liệu hoạt động
  const activities = [
    { id: 1, name: 'Hội thảo Trí tuệ nhân tạo và Machine Learning', date: '2025-01-15', location: 'Hội trường C' },
    { id: 2, name: 'Hội thảo Blockchain và Tiền mã hóa', date: '2025-02-22', location: 'Hội trường C' },
    { id: 3, name: 'Hội thảo Phát triển Web hiện đại', date: '2025-03-18', location: 'Hội trường C' },
  ];

  // Lọc sinh viên theo tìm kiếm
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.id.includes(searchQuery)
  );

  // Xử lý thay đổi trạng thái điểm danh
  const handleAttendanceChange = (studentId: string, checked: boolean) => {
    // Trong thực tế, đây sẽ là API call để cập nhật trạng thái điểm danh
    console.log(`Cập nhật điểm danh cho sinh viên ${studentId}: ${checked ? 'Có mặt' : 'Vắng mặt'}`);
  };

  // Nếu không phải cán bộ đoàn, hiển thị thông báo không có quyền truy cập
  if (!isUnionWorker) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Không có quyền truy cập</CardTitle>
              <CardDescription>
                Bạn không có quyền truy cập vào trang này. Chỉ cán bộ đoàn mới có thể thực hiện điểm danh.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href="/">Quay lại trang chủ</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Điểm danh hoạt động</h1>
          <Button>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Lưu điểm danh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hội thảo Trí tuệ nhân tạo và Machine Learning</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 2025-01-15 | Hội trường C
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Tìm kiếm theo tên hoặc mã số sinh viên"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Chọn hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map(activity => (
                      <SelectItem key={activity.id} value={activity.id.toString()}>
                        {activity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã số SV</TableHead>
                    <TableHead>Họ Tên</TableHead>
                    <TableHead>Lớp</TableHead>
                    <TableHead className="text-center">Điểm danh</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status}
                          onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}