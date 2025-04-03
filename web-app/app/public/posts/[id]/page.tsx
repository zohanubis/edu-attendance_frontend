"use client";

import { useState, useEffect } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, ArrowLeft, FileText, Download, Bookmark, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default function PublicPostDetailPage({ params }: PostDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [postData, setPostData] = useState<any>(null);

  useEffect(() => {
    // Tìm bài viết dựa vào id từ params
    const post = posts.find(p => p.id === parseInt(params.id));
    setPostData(post);
  }, [params.id]);

  if (!postData) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-muted-foreground">Không tìm thấy bài viết</p>
        </div>
      </PublicLayout>
    );
  }

  const handleBookmark = () => {
    toast.info('Vui lòng đăng nhập để lưu bài viết');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: postData.title,
        text: postData.description,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback khi không hỗ trợ Web Share API
      toast.error('Không thể chia sẻ bài viết');
    }
  };

  return (
    <PublicLayout>
      <div className="space-y-6 px-5">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/public/posts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{postData.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {postData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardDescription className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {postData.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Hoạt động: {postData.activityTitle}
              </div>
              <div className="text-sm text-muted-foreground">
                Tác giả: {postData.author}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmark}
                className={isBookmarked ? 'text-primary' : ''}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            {postData.fileUrl && (
              <Button asChild>
                <Link href={postData.fileUrl} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Tải tài liệu
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Bạn cần đăng nhập để lưu bài viết và đăng ký tham gia hoạt động</p>
          <Button asChild>
            <Link href="/auth/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}

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
    tags: ['AI', 'Machine Learning', 'Tài liệu'],
    content: `
      <h2>Giới thiệu về Trí tuệ nhân tạo và Machine Learning</h2>
      <p>Trí tuệ nhân tạo (AI) và Machine Learning đang thay đổi cách chúng ta tương tác với công nghệ và giải quyết các vấn đề phức tạp. Tài liệu này giới thiệu các khái niệm cơ bản về AI và Machine Learning, cũng như các ứng dụng thực tế của chúng trong nhiều lĩnh vực khác nhau.</p>
      
      <h3>Trí tuệ nhân tạo là gì?</h3>
      <p>Trí tuệ nhân tạo (AI) là một nhánh của khoa học máy tính tập trung vào việc tạo ra các hệ thống có khả năng thực hiện các nhiệm vụ thường đòi hỏi trí thông minh của con người. Các nhiệm vụ này bao gồm nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, ra quyết định và giải quyết vấn đề.</p>
      
      <h3>Machine Learning là gì?</h3>
      <p>Machine Learning là một phương pháp của AI cho phép máy tính học từ dữ liệu mà không cần được lập trình một cách rõ ràng. Thay vì viết mã để thực hiện một nhiệm vụ cụ thể, chúng ta cung cấp dữ liệu cho thuật toán và cho phép nó tự học cách thực hiện nhiệm vụ đó.</p>
    `,
    fileUrl: '/files/ai-machine-learning-intro.pdf'
  },
  {
    id: 2,
    title: 'Hướng dẫn thực hành Machine Learning cơ bản',
    date: '12/01/2025',
    activityId: 1,
    activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
    author: 'TS. Lê Văn Minh',
    description: 'Hướng dẫn thực hành các thuật toán Machine Learning cơ bản và cách triển khai chúng.',
    tags: ['AI', 'Machine Learning', 'Thực hành'],
    content: `
      <h2>Hướng dẫn thực hành Machine Learning cơ bản</h2>
      <p>Tài liệu này cung cấp hướng dẫn thực hành về cách triển khai các thuật toán Machine Learning cơ bản. Chúng tôi sẽ sử dụng Python và các thư viện phổ biến như NumPy, Pandas, Scikit-learn và TensorFlow.</p>
      
      <h3>Chuẩn bị môi trường</h3>
      <p>Trước khi bắt đầu, bạn cần cài đặt các thư viện sau:</p>
      <pre><code>pip install numpy pandas scikit-learn matplotlib tensorflow</code></pre>
    `,
    fileUrl: '/files/machine-learning-practice.pdf'
  },
  {
    id: 3,
    title: 'Giới thiệu về Blockchain và ứng dụng',
    date: '20/02/2025',
    activityId: 2,
    activityTitle: 'Hội thảo Blockchain và Tiền mã hóa',
    author: 'TS. Lê Văn Minh',
    description: 'Tài liệu giới thiệu về công nghệ Blockchain và các ứng dụng trong thực tế.',
    tags: ['Blockchain', 'Tài liệu'],
    content: `
      <h2>Giới thiệu về Blockchain và ứng dụng</h2>
      <p>Blockchain là một công nghệ sổ cái phân tán, cho phép lưu trữ dữ liệu một cách an toàn, minh bạch và không thể thay đổi. Tài liệu này giới thiệu về công nghệ Blockchain và các ứng dụng của nó trong thực tế.</p>
      
      <h3>Blockchain là gì?</h3>
      <p>Blockchain là một cơ sở dữ liệu phân tán, lưu trữ thông tin trong các khối (blocks) được liên kết với nhau bằng mã hóa. Mỗi khối chứa một số lượng giao dịch nhất định, và một khi được thêm vào chuỗi, thông tin trong khối không thể bị thay đổi mà không làm thay đổi tất cả các khối sau đó.</p>
    `,
    fileUrl: '/files/blockchain-introduction.pdf'
  }
];