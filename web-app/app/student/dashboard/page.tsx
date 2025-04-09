"use client";

import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Giả lập dữ liệu thống kê
const mockStatistics = {
  totalActivities: 12,
  totalStudents: 450,
  averageParticipation: 82,
  activitiesByMonth: [
    { month: 'Tháng 1', count: 2 },
    { month: 'Tháng 2', count: 1 },
    { month: 'Tháng 3', count: 3 },
    { month: 'Tháng 4', count: 2 },
    { month: 'Tháng 5', count: 1 },
    { month: 'Tháng 6', count: 0 },
    { month: 'Tháng 7', count: 0 },
    { month: 'Tháng 8', count: 0 },
    { month: 'Tháng 9', count: 1 },
    { month: 'Tháng 10', count: 1 },
    { month: 'Tháng 11', count: 0 },
    { month: 'Tháng 12', count: 1 },
  ],
  participationByClass: [
    { class: 'CNTT1', rate: 90 },
    { class: 'CNTT2', rate: 85 },
    { class: 'CNTT3', rate: 78 },
    { class: 'KHMT1', rate: 92 },
    { class: 'KHMT2', rate: 80 },
  ]
};

export default function DashboardPage() {
  const [isUnionWorker, setIsUnionWorker] = useState(false);
  const [statistics, setStatistics] = useState(mockStatistics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là cán bộ đoàn không
    // Trong thực tế, thông tin này sẽ được lấy từ API hoặc context
    const checkUnionWorkerStatus = async () => {
      // Giả lập việc kiểm tra từ API
      setIsUnionWorker(true); // Đặt thành true để demo
      setLoading(false);

      // Trong thực tế, dữ liệu thống kê sẽ được lấy từ API
      setStatistics(mockStatistics);
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
            Bạn không có quyền truy cập vào trang này. Chỉ cán bộ đoàn mới có thể xem thống kê điểm danh.
          </AlertDescription>
        </Alert>
      </StudentLayout>
    );
  }

  // Tạo dữ liệu cho biểu đồ cột (hoạt động theo tháng)
  const barChartData = {
    labels: statistics.activitiesByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Số hoạt động',
        data: statistics.activitiesByMonth.map(item => item.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  // Tạo dữ liệu cho biểu đồ tròn (tỷ lệ tham gia theo lớp)
  const pieChartData = {
    labels: statistics.participationByClass.map(item => item.class),
    datasets: [
      {
        label: 'Tỷ lệ tham gia',
        data: statistics.participationByClass.map(item => item.rate),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Thống kê điểm danh</h2>
          <p className="text-muted-foreground">
            Thông tin thống kê về hoạt động và tỷ lệ tham gia của sinh viên.
          </p>
        </div>

        {/* Thẻ thống kê tổng quan */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số hoạt động</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalActivities}</div>
              <p className="text-xs text-muted-foreground">Hoạt động đã được tổ chức</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số sinh viên</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Sinh viên đã tham gia</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ tham gia trung bình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.averageParticipation}%</div>
              <p className="text-xs text-muted-foreground">Tỷ lệ tham gia các hoạt động</p>
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ thống kê */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động theo tháng</CardTitle>
              <CardDescription>Số lượng hoạt động được tổ chức theo từng tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Trong thực tế, bạn sẽ sử dụng thư viện biểu đồ như Chart.js */}
                <div className="flex h-full items-end space-x-2">
                  {statistics.activitiesByMonth.map((item, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t" 
                        style={{ height: `${item.count * 30}px` }}
                      ></div>
                      <span className="text-xs mt-1">{item.month.substring(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tỷ lệ tham gia theo lớp</CardTitle>
              <CardDescription>Phần trăm sinh viên tham gia theo từng lớp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Trong thực tế, bạn sẽ sử dụng thư viện biểu đồ như Chart.js */}
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-2">
                    {statistics.participationByClass.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                        ></div>
                        <span className="text-sm">{item.class}</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">{statistics.averageParticipation}%</div>
                        <div className="text-xs text-muted-foreground">Trung bình</div>
                      </div>
                    </div>
                    {/* Giả lập biểu đồ tròn */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {statistics.participationByClass.map((item, index) => {
                        const startAngle = index > 0 ? 
                          statistics.participationByClass.slice(0, index).reduce((sum, i) => sum + i.rate, 0) / 100 * 360 : 0;
                        const endAngle = startAngle + item.rate / 100 * 360;
                        const x1 = 50 + 40 * Math.cos(startAngle * Math.PI / 180);
                        const y1 = 50 + 40 * Math.sin(startAngle * Math.PI / 180);
                        const x2 = 50 + 40 * Math.cos(endAngle * Math.PI / 180);
                        const y2 = 50 + 40 * Math.sin(endAngle * Math.PI / 180);
                        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                        
                        return (
                          <path 
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={`hsl(${index * 60}, 70%, 60%)`}
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}