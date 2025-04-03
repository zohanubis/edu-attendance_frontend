"use client";

import { useState } from 'react';
import { UnionWorkerLayout } from '@/components/union_worker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Eye } from 'lucide-react';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mẫu dữ liệu lịch sử điểm danh
  const attendanceHistory = [
    { 
      id: 1, 
      name: 'Hội thảo Trí tuệ nhân tạo và Machine Learning', 
      date: '2025-01-15', 
      location: 'Hội trường C',
      presenter: 'PGS.TS. Nguyễn Thanh Tùng',
      status: 'completed',
      attendees: 45,
      total: 50
    },
    { 
      id: 2, 
      name: 'Hội thảo Blockchain và Tiền mã hóa', 
      date: '2025-02-22', 
      location: 'Hội trường C',
      presenter: 'TS. Lê Minh Hoàng',
      status: 'completed',
      attendees: 38,
      total: 40
    },
    { 
      id: 3, 
      name: 'Hội thảo Phát triển Web hiện đại', 
      date: '2025-03-18', 
      location: 'Hội trường C',
      presenter: 'Kỹ sư Nguyễn Văn Hùng',
      status: 'completed',
      attendees: 42,
      total: 45
    },
  ];

  // Lọc hoạt động theo tìm kiếm
  const filteredHistory = attendanceHistory.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UnionWorkerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Lịch sử điểm danh hoạt động</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hiển thị danh sách lịch sử các hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Tìm kiếm theo tên hoạt động"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hoạt động</TableHead>
                    <TableHead>Thông tin</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="font-medium">{activity.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {activity.date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.presenter}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                            Đã kết thúc
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {activity.attendees}/{activity.total} sinh viên tham gia
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnionWorkerLayout>
  );
}