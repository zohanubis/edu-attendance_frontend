"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, MapPin, QrCode, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

// Mock data for a single attendance assignment
const assignmentData = {
  id: "1",
  title: "Youth Union Meeting",
  description: "Monthly meeting of the Youth Union committee.",
  content: `
    <p>This is the monthly meeting of the Youth Union committee. All members are required to attend.</p>
    
    <h3>Agenda:</h3>
    <ul>
      <li>Review of previous month's activities</li>
      <li>Planning for upcoming events</li>
      <li>Budget allocation for new initiatives</li>
      <li>Open discussion</li>
    </ul>
    
    <h3>Important Notes:</h3>
    <p>Please bring your student ID card for attendance verification.</p>
    <p>If you cannot attend, please notify the committee at least 24 hours in advance.</p>
  `,
  date: new Date("2025-01-20"),
  time: "15:00",
  duration: "2 hours",
  location: "Room 301",
  organizer: "Youth Union Committee",
  status: "Pending",
  image: "/placeholder.svg?height=400&width=800",
  attendanceCode: "YU-2025-01-20",
  students: [
    { id: "2001215800", name: "Huynh Thi An", status: "Pending" },
    { id: "2001215809", name: "Tran Bao Linh", status: "Pending" },
    { id: "2001215811", name: "Hoang Van An", status: "Pending" },
    { id: "2001215816", name: "Hoang Minh Linh", status: "Pending" },
    { id: "2001215821", name: "Dang Van An", status: "Pending" },
    { id: "2001215822", name: "Hoang Thi Khanh", status: "Pending" },
    { id: "2001215828", name: "Pham Ho Dang Huy", status: "Pending" },
    { id: "2001215836", name: "Kong Hoa Hung", status: "Pending" },
    { id: "2001215842", name: "Hoang Bao Hanh", status: "Pending" },
    { id: "2001215852", name: "Dang Thi Linh", status: "Pending" },
  ],
}

export default function AttendanceDetailPage({ params }: { params: { activityId: string } }) {
  const [attendanceCode, setAttendanceCode] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSubmitAttendance = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      if (attendanceCode === assignmentData.attendanceCode) {
        toast.success("Attendance recorded", {
          description: "Your attendance has been successfully recorded.",
        })
      } else {
        toast.error("Invalid code", {
          description: "The attendance code you entered is invalid. Please try again.",
        })
      }
      setIsSubmitting(false)
    }, 1000)
  }

  // Filter students based on search query
  const filteredStudents = assignmentData.students.filter((student) => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.id.includes(searchQuery)
  })

  const isPast = assignmentData.date < new Date()

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/attendance/assigned">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to assignments
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={assignmentData.image || "/placeholder.svg"}
                alt={assignmentData.title}
                className="w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{assignmentData.title}</h1>
                <p className="mt-2 text-muted-foreground">{assignmentData.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{assignmentData.duration}</Badge>
                <Badge>{assignmentData.status}</Badge>
              </div>

              <Separator />

              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: assignmentData.content }}
              />

              <Tabs defaultValue="attendance">
                <TabsList>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>
                <TabsContent value="attendance" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Record Attendance</CardTitle>
                      <CardDescription>Enter the attendance code to record your presence</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isPast ? (
                        <Alert>
                          <AlertTitle>Assignment has ended</AlertTitle>
                          <AlertDescription>
                            This assignment has already taken place and is no longer accepting attendance.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="attendance-code" className="text-sm font-medium">
                              Attendance Code
                            </label>
                            <div className="flex gap-2">
                              <Input
                                id="attendance-code"
                                placeholder="Enter attendance code"
                                value={attendanceCode}
                                onChange={(e) => setAttendanceCode(e.target.value)}
                              />
                              <Button onClick={handleSubmitAttendance} disabled={isSubmitting || !attendanceCode}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <QrCode className="h-4 w-4" />
                            <span>You can also scan the QR code at the venue to record your attendance.</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="students" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student List</CardTitle>
                      <CardDescription>List of students assigned to this activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="p-2 text-left font-medium">ID</th>
                                <th className="p-2 text-left font-medium">Name</th>
                                <th className="p-2 text-left font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredStudents.map((student) => (
                                <tr key={student.id} className="border-b">
                                  <td className="p-2">{student.id}</td>
                                  <td className="p-2 font-medium">{student.name}</td>
                                  <td className="p-2">
                                    <Badge variant="outline">{student.status}</Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Information</CardTitle>
                <CardDescription>Details about time and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">{format(assignmentData.date, "EEEE, MMMM dd, yyyy")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-muted-foreground">
                      {assignmentData.time} ({assignmentData.duration})
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{assignmentData.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Students</div>
                    <div className="text-muted-foreground">{assignmentData.students.length} assigned</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium">Organizer</div>
                  <div className="text-muted-foreground">{assignmentData.organizer}</div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Badge className="w-full justify-center py-2 text-center">{assignmentData.status}</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
