"use client";

import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  activityName: string;
  date: string;
  location: string;
  assignedTo: string;
  participationRate: number;
  status: 'completed' | 'pending';
}

export default function AttendanceHistoryPage() {
  const [isUnionWorker, setIsUnionWorker] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là cán bộ đoàn không
    // Trong thực tế, thông tin này sẽ được lấy từ API hoặc context
    const checkUnionWorkerStatus = async () => {
      // Giả lập việc kiểm tra từ API
      setIsUnionWorker(true); // Đặt thành true để demo
      setLoading(false);

      // Nếu là cán bộ đoàn, lấy dữ liệu lịch sử điểm danh
      if (true) { // Luôn lấy dữ liệu để demo
        // Trong thực tế, dữ liệu này sẽ được lấy từ API
        const mockData: AttendanceRecord[] = [
          {
            id: '1',
            activityName: 'Hội nghị sinh viên nghiên cứu khoa học',
            date: '2023-10-15',
            location: 'Hội trường A',
            assignedTo: 'Nguyễn Văn A',
            participationRate: 85,
            status: 'completed'
          },
          {
            id: '2',
            activityName: 'Seminar về trí tuệ nhân tạo',
            date: '2023-11-20',
            location: 'Phòng 305',
            assignedTo: 'Trần Thị B',
            participationRate: 92,
            status: 'completed'
          },
          {
            id: '3',
            activityName: 'Hội thảo kỹ năng mềm',
            date: '2023-12-05',
            location: 'Hội trường B',
            assignedTo: 'Lê Văn C',
            participationRate: 78,
            status: 'completed'
          },
          {
            id: '4',
            activityName: 'Cuộc thi lập trình',
            date: '2024-01-10',
            location: 'Phòng máy tính',
            assignedTo: 'Phạm Thị D',
            participationRate: 0,
            status: 'pending'
          },
        ];
        setAttendanceRecords(mockData);
      }
    };

    checkUnionWorkerStatus();
  }, []);

  // Hiển thị thông báo nếu không phải cán bộ đoàn
  if (!loading && !isUnionWorker) {
    return (
      <StudentLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Không có quyền truy cập</AlertTitle>
          <AlertDescription>
            Bạn không có quyền truy cập vào trang này. Chỉ cán bộ đoàn mới có thể xem lịch sử điểm danh đã phân công.
          </AlertDescription>
        </Alert>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lịch sử điểm danh đã phân công</h2>
          <p className="text-muted-foreground">
            Danh sách các hoạt động đã được phân công điểm danh cho cán bộ đoàn.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách hoạt động</CardTitle>
            <CardDescription>
              Thông tin về thời gian, địa điểm, người được phân công và tỷ lệ tham gia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên hoạt động</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Người được phân công</TableHead>
                  <TableHead>Tỷ lệ tham gia</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.activityName}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>{record.assignedTo}</TableCell>
                    <TableCell>
                      {record.status === 'completed' ? 
                        `${record.participationRate}%` : 
                        'Chưa hoàn thành'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={record.status === 'completed' ? 'default' : 'outline'}
                      >
                        {record.status === 'completed' ? 'Đã hoàn thành' : 'Đang chờ'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}