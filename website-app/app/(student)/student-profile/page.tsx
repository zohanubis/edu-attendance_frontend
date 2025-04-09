"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, School, GraduationCap, Calendar } from "lucide-react"

export default function StudentProfilePage() {
    const { user } = useAuth()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
                <Button>Chỉnh sửa</Button>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* Hồ sơ sinh viên */}
                <Card className="col-span-1">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.avatar || "/images/avatar.png"} alt={user?.name} />
                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-xl">{user?.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">MSSV: {user?.studentId}</p>
                        {user?.status && (
                            <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 border-green-300">
                                Union Worker
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>0779139003</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>Quận Tân Phú, TP.HCM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <School className="h-4 w-4" />
                            <span>Công nghệ thông tin</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <GraduationCap className="h-4 w-4" />
                            <span>Lớp 12DHTH01</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin chi tiết */}
                <div className="col-span-3">
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="info">Thông tin chi tiết</TabsTrigger>
                            <TabsTrigger value="activities">Hoạt động</TabsTrigger>
                        </TabsList>

                        <TabsContent value="info" className="space-y-6">
                            {/* Thông tin cá nhân */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Thông tin cá nhân</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Thông tin chi tiết của bạn
                                    </p>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Họ và tên</Label>
                                        <Input value="Phạm Hồ Đăng Huy" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value="zohanubis.work@gmail.com" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Số điện thoại</Label>
                                        <Input value="0779139003" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ngày sinh</Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>14/10/2003</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label>Địa chỉ</Label>
                                        <Input value="Quận Tân Phú, TP.HCM" readOnly />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Thông tin học tập */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Thông tin học tập</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Thông tin về khóa học và lớp học
                                    </p>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Mã số sinh viên</Label>
                                        <Input value="2001215828" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Khoa</Label>
                                        <Input value="Công nghệ thông tin" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Lớp</Label>
                                        <Input value="12DHTH01" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Năm nhập học</Label>
                                        <Input value="2021" readOnly />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activities">
                            {/* Điểm rèn luyện */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Điểm rèn luyện</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Tổng hợp điểm rèn luyện từ các hoạt động
                                    </p>
                                </CardHeader>
                                <CardContent className="text-center py-6">
                                    <div className="text-6xl font-bold mb-2">2</div>
                                    <p className="text-muted-foreground">Tổng điểm rèn luyện</p>
                                    <p className="mt-4 text-sm">
                                        Bạn đã tham gia 2 hoạt động và nhận được 2 điểm rèn luyện.
                                    </p>
                                    <Button variant="outline" className="mt-4">
                                        Xem lịch sử hoạt động
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
} 