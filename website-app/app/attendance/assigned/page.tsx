"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { DateRange } from "react-day-picker"

// Mock data for attendance assignments
const assignments = [
  {
    id: "1",
    title: "Youth Union Meeting",
    description: "Monthly meeting of the Youth Union committee.",
    date: new Date("2025-01-20"),
    time: "15:00",
    duration: "2 hours",
    location: "Room 301",
    status: "Pending",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Student Association Event",
    description: "Annual event organized by the Student Association.",
    date: new Date("2025-01-25"),
    time: "09:00",
    duration: "4 hours",
    location: "Main Hall",
    status: "Pending",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Faculty Meeting",
    description: "Meeting with faculty members and student representatives.",
    date: new Date("2024-12-15"),
    time: "14:00",
    duration: "1.5 hours",
    location: "Conference Room",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Volunteer Activity",
    description: "Community service activity organized by the Youth Union.",
    date: new Date("2024-11-30"),
    time: "08:00",
    duration: "6 hours",
    location: "Community Center",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function AttendanceAssignedPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

  // Filter assignments based on search query and date range
  const filteredAssignments = assignments.filter((assignment) => {
    // Filter by search query
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by date range
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (assignment.date >= dateRange.from && assignment.date <= dateRange.to)

    return matchesSearch && matchesDateRange
  })

  // Group assignments by status
  const pendingAssignments = filteredAssignments.filter((assignment) => assignment.status === "Pending")
  const completedAssignments = filteredAssignments.filter((assignment) => assignment.status === "Completed")

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Assignments</h1>
          <p className="text-muted-foreground">View and manage your Youth Union attendance assignments</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" placeholder="Filter by date" />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Pending Assignments</h2>
        {pendingAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
            <h3 className="text-lg font-medium">No pending assignments</h3>
            <p className="text-muted-foreground">You don't have any pending attendance assignments</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id} className="flex flex-col overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={assignment.image || "/placeholder.svg"}
                    alt={assignment.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-1">
                      <Link href={`/attendance/${assignment.id}`} className="hover:underline">
                        {assignment.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{assignment.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(assignment.date, "MMM dd, yyyy")}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{assignment.time}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{assignment.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="outline">{assignment.duration}</Badge>
                    <Button asChild size="sm">
                      <Link href={`/attendance/${assignment.id}`}>View</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Completed Assignments</h2>
        {completedAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
            <h3 className="text-lg font-medium">No completed assignments</h3>
            <p className="text-muted-foreground">You haven't completed any attendance assignments yet</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completedAssignments.map((assignment) => (
              <Card key={assignment.id} className="flex flex-col overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={assignment.image || "/placeholder.svg"}
                    alt={assignment.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-1">
                      <Link href={`/attendance/${assignment.id}`} className="hover:underline">
                        {assignment.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{assignment.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(assignment.date, "MMM dd, yyyy")}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{assignment.time}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{assignment.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="outline">{assignment.duration}</Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </Badge>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
