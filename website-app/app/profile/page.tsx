"use client"
import { format } from "date-fns"
import { Calendar, Mail, MapPin, Phone, School, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for student profile
const studentData = {
  name: "Pham Ho Dang Huy",
  id: "2001215828",
  email: "2001215828@uit.edu.vn",
  phone: "+84 123 456 789",
  department: "Faculty of Information Technology",
  major: "Software Engineering",
  class: "12DHT1H01",
  address: "Ho Chi Minh City, Vietnam",
  avatar: "/placeholder.svg?height=200&width=200",
  activityPoints: 85,
  totalRequiredPoints: 100,
  recentActivities: [
    {
      id: "3",
      title: "Cybersecurity and Information Security Workshop",
      date: new Date("2024-12-10"),
      time: "14:00",
      location: "Hall C",
      category: "Workshop",
      points: 1,
      status: "Attended",
    },
    {
      id: "4",
      title: "Modern Web Development Workshop",
      date: new Date("2024-11-18"),
      time: "14:00",
      location: "Hall A",
      category: "Workshop",
      points: 1,
      status: "Attended",
    },
    {
      id: "5",
      title: "Software Engineering and Agile Workshop",
      date: new Date("2024-10-29"),
      time: "14:00",
      location: "Hall B",
      category: "Workshop",
      points: 1,
      status: "Attended",
    },
  ],
  savedPosts: [
    {
      id: "1",
      title: "Artificial Intelligence and Machine Learning: Practical Applications in Daily Life",
      date: new Date("2025-01-15"),
      category: "Technology",
    },
    {
      id: "2",
      title: "Blockchain and Cryptocurrency: Future Technology Trends",
      date: new Date("2025-01-22"),
      category: "Technology",
    },
  ],
}

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={studentData.avatar} alt={studentData.name} />
              <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{studentData.name}</CardTitle>
            <CardDescription>{studentData.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.major}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.address}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Points</CardTitle>
              <CardDescription>Your current activity points progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {studentData.activityPoints}/{studentData.totalRequiredPoints} points
                </span>
              </div>
              <Progress value={(studentData.activityPoints / studentData.totalRequiredPoints) * 100} />
              <p className="text-sm text-muted-foreground">
                You need {studentData.totalRequiredPoints - studentData.activityPoints} more points to reach the
                required total.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="activities">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activities">Recent Activities</TabsTrigger>
              <TabsTrigger value="saved">Saved Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="activities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Activities you have recently participated in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge>
                            {activity.points} point{activity.points !== 1 && "s"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(activity.date, "MMM dd, yyyy")}</span>
                          </div>
                          <Badge variant="outline">{activity.category}</Badge>
                          <Badge
                            className={
                              activity.status === "Attended"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saved" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Posts</CardTitle>
                  <CardDescription>Posts you have saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.savedPosts.length > 0 ? (
                      studentData.savedPosts.map((post) => (
                        <div key={post.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{post.title}</h3>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{format(post.date, "MMM dd, yyyy")}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <h3 className="text-lg font-medium">No saved posts</h3>
                        <p className="text-muted-foreground">You haven't saved any posts yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
