"use client";

import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, User, ArrowLeft, Share2, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';

interface ActivityDetailPageProps {
  params: {
    id: string;
  };
}

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activityData, setActivityData] = useState<any>(null);
  
  // Mock data for a single activity
  const activity = {
    id: parseInt(params.id),
    title: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
    date: '15/01/2025',
    time: '2:00 PM',
    endTime: '4:00 PM',
    location: 'Hội trường C',
    host: 'PGS. TS. Nguyễn Thanh Tùng',
    participants: 85,
    maxParticipants: 100,
    image: '/images/ai-seminar.jpg',
    category: 'Công nghệ',
    tags: ['Công nghệ', 'AI', 'Hội thảo'],
    description: 'Hội thảo về trí tuệ nhân tạo và machine learning, giới thiệu các công nghệ mới nhất và ứng dụng trong thực tế.',
    content: `
      <p>Trí tuệ nhân tạo (AI) và Machine Learning đang thay đổi cách chúng ta tương tác với công nghệ và giải quyết các vấn đề phức tạp. Hội thảo này sẽ giới thiệu các khái niệm cơ bản về AI và Machine Learning, cũng như các ứng dụng thực tế của chúng trong nhiều lĩnh vực khác nhau.</p>
      
      <p>Các chủ đề chính của hội thảo bao gồm:</p>
      <ul>
        <li>Giới thiệu về Trí tuệ nhân tạo và Machine Learning</li>
        <li>Các thuật toán Machine Learning phổ biến</li>
        <li>Deep Learning và Neural Networks</li>
        <li>Ứng dụng AI trong các lĩnh vực thực tế</li>
        <li>Xu hướng phát triển của AI trong tương lai</li>
      </ul>
      
      <p>Hội thảo sẽ có sự tham gia của các chuyên gia hàng đầu trong lĩnh vực AI và Machine Learning, mang đến những kiến thức và kinh nghiệm quý báu cho người tham dự.</p>
    `,
    schedule: [
      { time: '2:00 PM - 2:15 PM', title: 'Khai mạc hội thảo', speaker: 'Ban tổ chức' },
      { time: '2:15 PM - 3:00 PM', title: 'Giới thiệu về AI và Machine Learning', speaker: 'PGS. TS. Nguyễn Thanh Tùng' },
      { time: '3:00 PM - 3:30 PM', title: 'Ứng dụng AI trong thực tế', speaker: 'TS. Lê Văn Minh' },
      { time: '3:30 PM - 3:45 PM', title: 'Giải lao', speaker: '' },
      { time: '3:45 PM - 4:00 PM', title: 'Hỏi đáp và kết thúc', speaker: 'Ban tổ chức' }
    ],
    speakers: [
      { name: 'PGS. TS. Nguyễn Thanh Tùng', role: 'Giảng viên Khoa CNTT', avatar: '/images/avatar.png' },
      { name: 'TS. Lê Văn Minh', role: 'Chuyên gia AI', avatar: '/images/avatar.png' }
    ],
    images: [
      '/images/ai-1.jpg',
      '/images/ai-2.jpg',
      '/images/ai-3.jpg'
    ],
    points: 1
  };

  // Simulate loading activity data
  useEffect(() => {
    setActivityData(activity);
  }, []);

  const handleRegister = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(!isRegistered);
      setIsLoading(false);
      
      if (!isRegistered) {
        toast.success('Đăng ký tham gia thành công', {
          description: `Bạn đã đăng ký tham gia ${activity.title}`,
          icon: <Check className="h-4 w-4" />
        });
      } else {
        toast.error('Đã hủy đăng ký', {
          description: `Bạn đã hủy đăng ký tham gia ${activity.title}`,
          icon: <X className="h-4 w-4" />
        });
      }
    }, 1000);
  };
  
  // Calculate registration progress
  const registrationProgress = Math.floor((activity.participants / activity.maxParticipants) * 100);

  return (
    <StudentLayout>
      <div className="space-y-6 text-left">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/activities">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{activity.title}</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mx-auto">
          <div className="lg:col-span-2 space-y-6 text-left">
            <Card className="overflow-hidden">
              <div className="relative h-[300px]">
                <Image 
                  src={activity.image} 
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {activity.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl">{activity.title}</CardTitle>
                <CardDescription className="text-base">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Ngày: {activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Thời gian: {activity.time} - {activity.endTime}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Địa điểm: {activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Số người tham gia: {activity.participants}/{activity.maxParticipants}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Người tổ chức: {activity.host}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Điểm rèn luyện: {activity.points}</span>
                </div>
              </CardFooter>
            </Card>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Chi tiết</TabsTrigger>
                <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
                <TabsTrigger value="gallery">Hình ảnh</TabsTrigger>
                <TabsTrigger value="posts">Tài liệu</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin chi tiết</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: activity.content }} />
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-2">Thông tin bổ sung</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Ngày tạo: 01/01/2025</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Đã đăng ký: {activity.participants} người</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="schedule" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch trình</CardTitle>
                    <CardDescription>Chi tiết lịch trình của hoạt động</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activity.schedule.map((item, index) => (
                        <div key={index} className="relative pl-6 pb-4 group">
                          {index !== activity.schedule.length - 1 && (
                            <div className="absolute left-2 top-2 bottom-0 w-[1px] bg-border group-hover:bg-primary/50 transition-colors" />
                          )}
                          <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary group-hover:scale-110 transition-transform" />
                          <div className="font-medium text-primary">{item.time}</div>
                          <div className="font-medium">{item.title}</div>
                          {item.speaker && (
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <User className="mr-1 h-3 w-3" />
                              Người trình bày: {item.speaker}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="gallery" className="mt-4">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-center">Hình ảnh</CardTitle>
                    <CardDescription>Hình ảnh từ các hoạt động trước đây</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {activity.images.map((image, index) => (
                        <div key={index} className="relative aspect-video overflow-hidden rounded-md group cursor-pointer hover:shadow-md transition-all duration-300">
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{`Hình ${index + 1}`}</span>
                          </div>
                          <Image 
                            src={image} 
                            alt={`${activity.title} - Hình ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    {activity.images.length > 0 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                          Xem tất cả hình ảnh
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="posts" className="mt-4">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-center">Tài liệu kèm theo</CardTitle>
                    <CardDescription>Các tài liệu liên quan đến hoạt động</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activity.id === 1 ? (
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 hover:border-primary transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">Tài liệu giới thiệu về AI và Machine Learning</h3>
                                <p className="text-sm text-muted-foreground">Cập nhật: 10/01/2025</p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/posts/1">Xem</Link>
                              </Button>
                            </div>
                          </div>
                          <div className="border rounded-md p-4 hover:border-primary transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">Hướng dẫn thực hành Machine Learning cơ bản</h3>
                                <p className="text-sm text-muted-foreground">Cập nhật: 12/01/2025</p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/posts/2">Xem</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Không có tài liệu nào cho hoạt động này</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6 text-left">
            <Card>
              <CardHeader>
                <CardTitle>Đăng ký tham gia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Trạng thái:</span>
                    <Badge variant={isRegistered ? "success" : "outline"}>
                      {isRegistered ? "Đã đăng ký" : "Chưa đăng ký"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span>Số người tham gia:</span>
                      <span>{activity.participants}/{activity.maxParticipants}</span>
                    </div>
                    <Progress value={registrationProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      Còn {activity.maxParticipants - activity.participants} chỗ trống
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Điểm rèn luyện:</span>
                    <span>{activity.points} điểm</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={isRegistered ? "destructive" : "default"}
                    onClick={handleRegister}
                    disabled={isLoading || (!isRegistered && activity.participants >= activity.maxParticipants)}
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2">Đang xử lý...</span>
                        <span className="animate-spin">⏳</span>
                      </>
                    ) : isRegistered ? (
                      "Hủy đăng ký"
                    ) : activity.participants >= activity.maxParticipants ? (
                      "Đã hết chỗ"
                    ) : (
                      "Đăng ký tham gia"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Người tổ chức</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={speaker.avatar} alt={speaker.name} />
                        <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{speaker.name}</div>
                        <div className="text-sm text-muted-foreground">{speaker.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chia sẻ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Chia sẻ hoạt động này với bạn bè của bạn</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" title="Chia sẻ qua Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-600" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" title="Chia sẻ qua Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-400" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" title="Chia sẻ qua Email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-600" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1" title="Sao chép liên kết">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}