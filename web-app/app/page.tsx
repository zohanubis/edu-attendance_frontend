"use client";

import { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Bell, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingActivities = [
    {
      id: 1,
      title: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      date: '15/01/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      host: 'PGS. TS. Nguyễn Thanh Tùng',
      participants: 100,
      maxParticipants: 100,
      image: '/images/ai-seminar.jpg',
      tags: ['Công nghệ', 'AI', 'Hội thảo']
    },
    {
      id: 2,
      title: 'Hội thảo Blockchain và Tiền mã hóa',
      date: '22/02/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      host: 'TS. Lê Văn Minh',
      participants: 85,
      maxParticipants: 100,
      image: '/images/ai-1.jpg',
      tags: ['Công nghệ', 'Blockchain', 'Hội thảo']
    }
  ];

  const recentActivities = [
    {
      id: 3,
      title: 'Hội thảo An ninh mạng và Bảo mật thông tin',
      date: '10/03/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      host: 'TS. Trần Văn An',
      participants: 95,
      maxParticipants: 100,
      image: '/images/ai-2.jpg',
      tags: ['Công nghệ', 'An ninh mạng', 'Hội thảo']
    },
    {
      id: 4,
      title: 'Hội thảo Phát triển Web hiện đại',
      date: '18/03/2025',
      time: '2:00 PM',
      location: 'Hội trường C',
      host: 'ThS. Nguyễn Văn Bình',
      participants: 75,
      maxParticipants: 100,
      image: '/images/ai-3.jpg',
      tags: ['Công nghệ', 'Web', 'Hội thảo']
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Thông báo về việc đăng ký hoạt động ngoại khóa học kỳ 2',
      date: '05/01/2025',
      content: 'Sinh viên cần đăng ký hoạt động ngoại khóa học kỳ 2 trước ngày 20/01/2025.'
    },
    {
      id: 2,
      title: 'Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025',
      date: '10/01/2025',
      content: 'Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được cập nhật.'
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Xin chào, Sinh viên</h1>
            <p className="text-muted-foreground">Chào mừng bạn đến với hệ thống quản lý điểm danh</p>
          </div>
          <Button asChild>
            <Link href="/activities">Xem tất cả hoạt động</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hoạt động sắp tới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingActivities.length}</div>
              <p className="text-xs text-muted-foreground">
                <Calendar className="inline h-4 w-4 mr-1" />
                Hoạt động trong tháng này
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Điểm rèn luyện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 điểm</div>
              <p className="text-xs text-muted-foreground">
                <Users className="inline h-4 w-4 mr-1" />
                Từ 2 hoạt động đã tham gia
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Thông báo mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{announcements.length}</div>
              <p className="text-xs text-muted-foreground">
                <Bell className="inline h-4 w-4 mr-1" />
                Thông báo chưa đọc
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
           <div className="flex justify-between items-center mb-4">
             <TabsList>
               <TabsTrigger value="upcoming">Sắp diễn ra</TabsTrigger>
               <TabsTrigger value="recent">Gần đây</TabsTrigger>
             </TabsList>
           </div>
           
           <TabsContent value="upcoming" className="m-0">
             <div className="grid gap-4 md:grid-cols-2">
               {upcomingActivities.map((activity) => (
                 <Card key={activity.id} className="overflow-hidden">
                   <div className="relative h-40">
                     <Image 
                       src={activity.image} 
                       alt={activity.title}
                       fill
                       className="object-cover"
                     />
                   </div>
                   <CardHeader>
                     <div className="flex justify-between items-start">
                       <CardTitle className="text-lg">{activity.title}</CardTitle>
                       <div className="flex gap-1">
                         {activity.tags.map((tag, index) => (
                           <Badge key={index} variant="secondary" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                     </div>
                     <CardDescription>
                       <div className="flex items-center text-sm text-muted-foreground mb-1">
                         <Calendar className="mr-2 h-4 w-4" />
                         {activity.date} - {activity.time}
                       </div>
                       <div className="flex items-center text-sm text-muted-foreground mb-1">
                         <MapPin className="mr-2 h-4 w-4" />
                         {activity.location}
                       </div>
                       <div className="flex items-center text-sm text-muted-foreground">
                         <Users className="mr-2 h-4 w-4" />
                         {activity.participants}/{activity.maxParticipants} người tham gia
                       </div>
                     </CardDescription>
                   </CardHeader>
                   <CardContent className="flex justify-end pt-0">
                     <Button asChild>
                       <Link href={`/activities/${activity.id}`}>Xem chi tiết</Link>
                     </Button>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </TabsContent>
            
           <TabsContent value="recent" className="m-0">
             <div className="grid gap-4 md:grid-cols-2">
               {recentActivities.map((activity) => (
                 <Card key={activity.id} className="overflow-hidden">
                   <div className="relative h-40">
                     <Image 
                       src={activity.image} 
                       alt={activity.title}
                       fill
                       className="object-cover"
                     />
                   </div>
                   <CardHeader>
                     <div className="flex justify-between items-start">
                       <CardTitle className="text-lg">{activity.title}</CardTitle>
                       <div className="flex gap-1">
                         {activity.tags.map((tag, index) => (
                           <Badge key={index} variant="secondary" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                     </div>
                     <CardDescription>
                       <div className="flex items-center text-sm text-muted-foreground mb-1">
                         <Calendar className="mr-2 h-4 w-4" />
                         {activity.date} - {activity.time}
                       </div>
                       <div className="flex items-center text-sm text-muted-foreground mb-1">
                         <MapPin className="mr-2 h-4 w-4" />
                         {activity.location}
                       </div>
                       <div className="flex items-center text-sm text-muted-foreground">
                         <Users className="mr-2 h-4 w-4" />
                         {activity.participants}/{activity.maxParticipants} người tham gia
                       </div>
                     </CardDescription>
                   </CardHeader>
                   <CardContent className="flex justify-end pt-0">
                     <Button asChild>
                       <Link href={`/activities/${activity.id}`}>Xem chi tiết</Link>
                     </Button>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </TabsContent>
         </Tabs>

         <div>
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold">Thông báo mới nhất</h2>
             <Button variant="outline" size="sm" asChild>
               <Link href="/announcements">
                 <FileText className="mr-2 h-4 w-4" />
                 Xem tất cả
               </Link>
             </Button>
           </div>
           
           <div className="space-y-4">
             {announcements.map((announcement) => (
               <Card key={announcement.id}>
                 <CardHeader>
                   <div className="flex justify-between items-start">
                     <CardTitle className="text-lg">{announcement.title}</CardTitle>
                     <Badge variant="outline">{announcement.date}</Badge>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <p>{announcement.content}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </div>
     </StudentLayout>
   );
  }
