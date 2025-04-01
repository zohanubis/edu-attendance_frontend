"use client";

import { useState } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, FileText, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  
  // Mock data for posts
  const posts = [
    {
      id: 1,
      title: 'Tài liệu giới thiệu về AI và Machine Learning',
      date: '10/01/2025',
      activityId: 1,
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'PGS. TS. Nguyễn Thanh Tùng',
      description: 'Tài liệu giới thiệu các khái niệm cơ bản về AI và Machine Learning, cũng như các ứng dụng thực tế.',
      tags: ['AI', 'Machine Learning', 'Tài liệu']
    },
    {
      id: 2,
      title: 'Hướng dẫn thực hành Machine Learning cơ bản',
      date: '12/01/2025',
      activityId: 1,
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'TS. Lê Văn Minh',
      description: 'Hướng dẫn thực hành các thuật toán Machine Learning cơ bản và cách triển khai chúng.',
      tags: ['AI', 'Machine Learning', 'Thực hành']
    },
    {
      id: 3,
      title: 'Giới thiệu về Blockchain và ứng dụng',
      date: '20/02/2025',
      activityId: 2,
      activityTitle: 'Hội thảo Blockchain và Tiền mã hóa',
      author: 'TS. Lê Văn Minh',
      description: 'Tài liệu giới thiệu về công nghệ Blockchain và các ứng dụng trong thực tế.',
      tags: ['Blockchain', 'Tài liệu']
    },
    {
      id: 4,
      title: 'Hướng dẫn phát triển ứng dụng trên nền tảng Blockchain',
      date: '22/02/2025',
      activityId: 2,
      activityTitle: 'Hội thảo Blockchain và Tiền mã hóa',
      author: 'TS. Lê Văn Minh',
      description: 'Hướng dẫn thực hành phát triển ứng dụng đơn giản trên nền tảng Blockchain.',
      tags: ['Blockchain', 'Thực hành']
    },
    {
      id: 5,
      title: 'Bảo mật thông tin trong thời đại số',
      date: '05/03/2025',
      activityId: 3,
      activityTitle: 'Hội thảo An ninh mạng và Bảo mật thông tin',
      author: 'TS. Trần Văn An',
      description: 'Tài liệu về các phương pháp bảo mật thông tin và bảo vệ dữ liệu cá nhân trong thời đại số.',
      tags: ['An ninh mạng', 'Bảo mật', 'Tài liệu']
    }
  ];

  // Filter posts based on search query and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = tagFilter === 'all' || post.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  // Get unique tags for filter
  const tags = ['all', ...new Set(posts.flatMap(post => post.tags))];

  return (
    <StudentLayout>
      <div className="space-y-6 px-5 mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Tài liệu</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end justify-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-muted-foreground h-4 w-4" />
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Thẻ" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag === 'all' ? 'Tất cả thẻ' : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="text-left">
                <CardHeader>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
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
                      <Link href={`/posts/${post.id}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Không tìm thấy tài liệu nào</h3>
            <p className="text-muted-foreground mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => {
                setSearchQuery('');
                setTagFilter('all');
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