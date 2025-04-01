"use client";

import { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, School, MapPin, Calendar, Edit } from 'lucide-react';

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock student data
  const [studentData, setStudentData] = useState({
    id: '2001215828',
    name: 'Phạm Hồ Đăng Huy',
    email: 'zohanubis.work@gmail.com',
    phone: '0779139003',
    dob: '14/10/2003',
    address: 'Quận Tân Phú, TP.HCM',
    faculty: 'Công nghệ thông tin',
    class: '12DHTH01',
    enrollmentYear: '2021',
    avatar: '/images/avatar.png',
    points: 2
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here would be API call to update student data
  };

  return (
    <StudentLayout>
      <div className="space-y-6 px-5 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
          <Button onClick={handleEdit} variant={isEditing ? "destructive" : "default"}>
            {isEditing ? "Hủy" : "Chỉnh sửa"}
            {!isEditing && <Edit className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Hồ sơ sinh viên</CardTitle>
              <CardDescription>Thông tin cơ bản của bạn</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={studentData.avatar} alt={studentData.name} />
                <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{studentData.name}</h2>
              <p className="text-muted-foreground">MSSV: {studentData.id}</p>
              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{studentData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{studentData.phone}</span>
                </div>
                <div className="flex items-center">
                  <School className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{studentData.faculty}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Lớp {studentData.class}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Thông tin chi tiết</TabsTrigger>
                <TabsTrigger value="activities">Hoạt động</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Thông tin chi tiết của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input 
                              id="name" 
                              value={studentData.name} 
                              onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              value={studentData.email} 
                              onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input 
                              id="phone" 
                              value={studentData.phone} 
                              onChange={(e) => setStudentData({...studentData, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Ngày sinh</Label>
                            <Input 
                              id="dob" 
                              value={studentData.dob} 
                              onChange={(e) => setStudentData({...studentData, dob: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input 
                              id="address" 
                              value={studentData.address} 
                              onChange={(e) => setStudentData({...studentData, address: e.target.value})}
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-4">Lưu thay đổi</Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Họ và tên</p>
                            <p>{studentData.name}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p>{studentData.email}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                            <p>{studentData.phone}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Ngày sinh</p>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <p>{studentData.dob}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Địa chỉ</p>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <p>{studentData.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin học tập</CardTitle>
                    <CardDescription>Thông tin về khóa học và lớp học</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Mã số sinh viên</p>
                        <p>{studentData.id}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Khoa</p>
                        <p>{studentData.faculty}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Lớp</p>
                        <p>{studentData.class}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Năm nhập học</p>
                        <p>{studentData.enrollmentYear}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Điểm rèn luyện</CardTitle>
                    <CardDescription>Tổng hợp điểm rèn luyện từ các hoạt động</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="text-4xl font-bold">{studentData.points}</div>
                      <p className="text-muted-foreground">Tổng điểm rèn luyện</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Bạn đã tham gia 2 hoạt động và nhận được 2 điểm rèn luyện.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/student/history">Xem lịch sử hoạt động</a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}