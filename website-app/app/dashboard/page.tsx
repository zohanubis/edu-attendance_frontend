"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, CheckCircle2, Clock4 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"

// Mock data for student dashboard
const studentData = {
  name: "Pham Ho Dang Huy",
  id: "2001215828",
  department: "Faculty of Information Technology",
  major: "Software Engineering",
  activityPoints: 85,
  totalRequiredPoints: 100,
  upcomingActivities: [
    {
      id: "1",
      title: "AI and Machine Learning Workshop",
      date: new Date("2025-01-15"),
      time: "14:00",
      location: "Hall A",
      category: "Workshop",
      points: 1,
      image: "https://placehold.co/400x200/png",
    },
    {
      id: "2",
      title: "Blockchain and Cryptocurrency Workshop",
      date: new Date("2025-02-22"),
      time: "14:00",
      location: "Hall B",
      category: "Workshop",
      points: 1,
      image: "https://placehold.co/400x200/png",
    },
  ],
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
      image: "https://placehold.co/400x200/png",
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
      image: "https://placehold.co/400x200/png",
    },
  ],
  attendanceAssignments: [
    {
      id: "1",
      title: "Youth Union Meeting",
      date: new Date("2025-01-20"),
      time: "15:00",
      location: "Room 301",
      status: "Pending",
    },
    {
      id: "2",
      title: "Student Association Event",
      date: new Date("2025-01-25"),
      time: "09:00",
      location: "Main Hall",
      status: "Pending",
    },
  ],
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Points</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentData.activityPoints}/{studentData.totalRequiredPoints}
            </div>
            <Progress value={(studentData.activityPoints / studentData.totalRequiredPoints) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {studentData.totalRequiredPoints - studentData.activityPoints} points needed to reach the goal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.upcomingActivities.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Next: {studentData.upcomingActivities[0]?.title || "No upcoming activities"}
            </p>
          </CardContent>
        </Card>
        {user.role === "youth-union" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.attendanceAssignments.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Next: {format(studentData.attendanceAssignments[0]?.date, "MMM dd, yyyy")}
              </p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            <Clock4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.recentActivities.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Last: {studentData.recentActivities[0]?.title || "No recent activities"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Activities</TabsTrigger>
          <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          {user.role === "youth-union" && <TabsTrigger value="attendance">Attendance Assignments</TabsTrigger>}
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentData.upcomingActivities.length > 0 ? (
              studentData.upcomingActivities.map((activity) => (
                <Card key={activity.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={activity.image || "https://placehold.co/400x200/png"}
                      alt={activity.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">
                        <Link href={`/activities/${activity.id}`} className="hover:underline">
                          {activity.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(activity.date, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <div className="flex items-center justify-between w-full">
                      <Badge variant="outline">{activity.category}</Badge>
                      <Badge>
                        {activity.points} point{activity.points !== 1 && "s"}
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium">No upcoming activities</h3>
                <p className="text-muted-foreground">You don't have any upcoming activities.</p>
                <Button asChild className="mt-4">
                  <Link href="/activities">Browse Activities</Link>
                </Button>
              </div>
            )}
          </div>
          {studentData.upcomingActivities.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/my-activities">
                  View All My Activities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          {/* Recent activities content similar to above */}
        </TabsContent>
        {user.role === "youth-union" && (
          <TabsContent value="attendance" className="mt-6">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium">Activity</th>
                    <th className="p-4 text-left font-medium">Date</th>
                    <th className="p-4 text-left font-medium">Time</th>
                    <th className="p-4 text-left font-medium">Location</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.attendanceAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b">
                      <td className="p-4 font-medium">{assignment.title}</td>
                      <td className="p-4">{format(assignment.date, "MMM dd, yyyy")}</td>
                      <td className="p-4">{assignment.time}</td>
                      <td className="p-4">{assignment.location}</td>
                      <td className="p-4">
                        <Badge variant="outline">{assignment.status}</Badge>
                      </td>
                      <td className="p-4">
                        <Button asChild size="sm">
                          <Link href={`/attendance/${assignment.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/attendance/assigned">
                  View All Assignments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
