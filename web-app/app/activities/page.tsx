"use client";

import { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const activities = [
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
      category: 'Công nghệ',
      tags: ['Công nghệ', 'AI', 'Hội thảo'],
      description: 'Hội thảo về trí tuệ nhân tạo và machine learning, giới thiệu các công nghệ mới nhất và ứng dụng trong thực tế.'
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
      category: 'Công nghệ',
      tags: ['Công nghệ', 'Blockchain', 'Hội thảo'],
      description: 'Hội thảo về công nghệ blockchain và tiền mã hóa, xu hướng phát triển và ứng dụng trong các lĩnh vực.'
    },
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
      category: 'An ninh mạng',
      tags: ['Công nghệ', 'An ninh mạng', 'Hội thảo'],
      description: 'Hội thảo về an ninh mạng và bảo mật thông tin, các phương pháp bảo vệ dữ liệu và phòng chống tấn công mạng.'
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
      category: 'Web',
      tags: ['Công nghệ', 'Web', 'Hội thảo'],
      description: 'Hội thảo về phát triển web hiện đại, các công nghệ và framework mới nhất trong phát triển web.'
    },
    {
      id: 5,
      title: 'Sinh viên nghiên cứu khoa học năm 2025',
      date: '29/03/2025',
      time: '8:00 AM',
      location: 'Hội trường A',
      host: 'Ban Khoa học Công nghệ',
      participants: 120,
      maxParticipants: 150,
      image: '/images/29_03_2025_SVNCKH.jpg',
      category: 'Nghiên cứu',
      tags: ['Nghiên cứu', 'Khoa học', 'Hội nghị'],
      description: 'Hội nghị sinh viên nghiên cứu khoa học năm 2025, trình bày các đề tài nghiên cứu của sinh viên.'
    }
  ];

  // Filter activities based on search query and category
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(activities.map(activity => activity.category))];

  return (
    <StudentLayout>
      <div className="space-y-6 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Hoạt động</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm hoạt động..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-muted-foreground h-4 w-4" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Tất cả danh mục' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image 
                    src={activity.image} 
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {activity.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
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
                    <Link href={`/activities/${activity.id}`}>Xem chi tiết</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Không tìm thấy hoạt động nào</h3>
            <p className="text-muted-foreground mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}