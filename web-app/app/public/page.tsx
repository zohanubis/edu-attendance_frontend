"use client";

import { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Bell, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';

export default function PublicHomePage() {
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

  const recentPosts = [
    {
      id: 1,
      title: 'Tài liệu giới thiệu về AI và Machine Learning',
      date: '10/01/2025',
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'PGS. TS. Nguyễn Thanh Tùng',
      tags: ['AI', 'Machine Learning', 'Tài liệu']
    },
    {
      id: 2,
      title: 'Hướng dẫn thực hành Machine Learning cơ bản',
      date: '12/01/2025',
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'TS. Lê Văn Minh',
      tags: ['AI', 'Machine Learning', 'Thực hành']
    },
    {
      id: 3,
      title: 'Giới thiệu về Blockchain và ứng dụng',
      date: '20/02/2025',
      activityTitle: 'Hội thảo Blockchain và Tiền mã hóa',
      author: 'TS. Lê Văn Minh',
      tags: ['Blockchain', 'Tài liệu']
    }
  ];

  return (
    <PublicLayout>
      <div className="space-y-8 px-4 md:px-6 w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hệ thống quản lý hoạt động và điểm rèn luyện</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tham gia các hoạt động, sự kiện của trường và tích lũy điểm rèn luyện. Đăng ký tài khoản để quản lý hoạt động và theo dõi điểm rèn luyện của bạn.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" asChild>
              <Link href="/auth/login">Đăng nhập</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Đăng ký</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Hoạt động</h2>
            <Button variant="outline" asChild>
              <Link href="/public/activities">Xem tất cả</Link>
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming" onClick={() => setActiveTab('upcoming')}>Sắp diễn ra</TabsTrigger>
              <TabsTrigger value="recent" onClick={() => setActiveTab('recent')}>Gần đây</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {upcomingActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={activity.image} 
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {activity.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {activity.date} - {activity.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {activity.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          {activity.participants}/{activity.maxParticipants} người tham gia
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/public/activities/${activity.id}`}>Xem chi tiết</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {recentActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={activity.image} 
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {activity.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {activity.date} - {activity.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {activity.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          {activity.participants}/{activity.maxParticipants} người tham gia
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/public/activities/${activity.id}`}>Xem chi tiết</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Tài liệu mới nhất</h2>
            <Button variant="outline" asChild>
              <Link href="/public/posts">Xem tất cả</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      Hoạt động: {post.activityTitle}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                    <Button size="sm" asChild>
                      <Link href={`/public/posts/${post.id}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Bắt đầu ngay hôm nay</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Đăng ký tài khoản để tham gia các hoạt động, tích lũy điểm rèn luyện và theo dõi tiến trình của bạn.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Đăng ký ngay</Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}