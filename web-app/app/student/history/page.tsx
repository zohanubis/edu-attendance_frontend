"use client";

import { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Check, X, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function StudentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const attendanceHistory = [
    {
      id: 1,
      activityName: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      date: '15/01/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      status: 'attended', // attended, missed, upcoming
      points: 1
    },
    {
      id: 2,
      activityName: 'Hội thảo Blockchain và Tiền mã hóa',
      date: '22/02/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      status: 'missed',
      points: 0
    },
    {
      id: 3,
      activityName: 'Hội thảo An ninh mạng và Bảo mật thông tin',
      date: '10/03/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      status: 'attended',
      points: 1
    },
    {
      id: 4,
      activityName: 'Hội thảo Phát triển Web hiện đại',
      date: '18/03/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      status: 'missed',
      points: 0
    }
  ];

  // Filter attendance history based on search query and status
  const filteredHistory = attendanceHistory.filter(item => {
    const matchesSearch = item.activityName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate total points
  const totalPoints = attendanceHistory.reduce((sum, item) => sum + item.points, 0);
  const totalActivities = attendanceHistory.length;
  const attendedActivities = attendanceHistory.filter(item => item.status === 'attended').length;

  return (
    <StudentLayout>
      <div className="space-y-6 px-5 mx-auto">
        <h1 className="text-3xl font-bold">Lịch sử điểm danh</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tổng điểm rèn luyện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints} điểm</div>
              <p className="text-xs text-muted-foreground">
                Từ {attendedActivities}/{totalActivities} hoạt động đã tham gia
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hoạt động đã tham gia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendedActivities}</div>
              <p className="text-xs text-muted-foreground">
                <Check className="inline h-4 w-4 text-green-500 mr-1" />
                Đã điểm danh thành công
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hoạt động đã bỏ lỡ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActivities - attendedActivities}</div>
              <p className="text-xs text-muted-foreground">
                <X className="inline h-4 w-4 text-red-500 mr-1" />
                Không tham gia
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>Tất cả</TabsTrigger>
              <TabsTrigger value="attended" onClick={() => setStatusFilter('attended')}>Đã tham gia</TabsTrigger>
              <TabsTrigger value="missed" onClick={() => setStatusFilter('missed')}>Đã bỏ lỡ</TabsTrigger>
            </TabsList>
            
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Tìm kiếm hoạt động..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Xóa
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hoạt động</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Địa điểm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Điểm RL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.activityName}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {item.date}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4" />
                              {item.time}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              {item.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.status === 'attended' ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="mr-1 h-3 w-3" /> Đã điểm danh
                              </Badge>
                            ) : item.status === 'missed' ? (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <X className="mr-1 h-3 w-3" /> Vắng mặt
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <AlertCircle className="mr-1 h-3 w-3" /> Sắp diễn ra
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{item.points}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Không tìm thấy hoạt động nào
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attended" className="m-0">
            {/* Nội dung giống với tab "all" nhưng đã được lọc bởi statusFilter */}
          </TabsContent>
          
          <TabsContent value="missed" className="m-0">
            {/* Nội dung giống với tab "all" nhưng đã được lọc bởi statusFilter */}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}