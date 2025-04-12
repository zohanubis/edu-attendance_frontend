"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker-ui"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { DateRange } from "react-day-picker"

// Mock data for student activities
const activities = [
  {
    id: "1",
    title: "AI and Machine Learning Workshop",
    description: "Join the workshop to learn about practical applications of AI and Machine Learning.",
    date: new Date("2025-01-15"),
    time: "14:00",
    location: "Hall A",
    category: "Workshop",
    points: 1,
    status: "Registered",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Blockchain and Cryptocurrency Workshop",
    description: "Learn about Blockchain technology and its applications in various fields.",
    date: new Date("2025-02-22"),
    time: "14:00",
    location: "Hall B",
    category: "Workshop",
    points: 1,
    status: "Registered",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Cybersecurity and Information Security Workshop",
    description: "Learn about cybersecurity issues and how to protect personal information on the internet.",
    date: new Date("2024-12-10"),
    time: "14:00",
    location: "Hall C",
    category: "Workshop",
    points: 1,
    status: "Attended",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Modern Web Development Workshop",
    description: "Learn about the latest technologies and frameworks in web development.",
    date: new Date("2024-11-18"),
    time: "14:00",
    location: "Hall A",
    category: "Workshop",
    points: 1,
    status: "Attended",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Software Engineering and Agile Workshop",
    description: "Learn about Agile software development processes and effective project management methods.",
    date: new Date("2024-10-29"),
    time: "14:00",
    location: "Hall B",
    category: "Workshop",
    points: 1,
    status: "Attended",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Status options for filtering
const statusOptions = [
  { value: "all", label: "All" },
  { value: "Registered", label: "Registered" },
  { value: "Attended", label: "Attended" },
  { value: "Missed", label: "Missed" },
]

export default function MyActivitiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [selectedStatus, setSelectedStatus] = React.useState("all")

  // Filter activities based on search query, date range, and status
  const filteredActivities = activities.filter((activity) => {
    // Filter by search query
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by date range
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (activity.date >= dateRange.from && activity.date <= dateRange.to)

    // Filter by status
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus

    return matchesSearch && matchesDateRange && matchesStatus
  })

  // Group activities by status
  const registeredActivities = filteredActivities.filter((activity) => activity.status === "Registered")
  const attendedActivities = filteredActivities.filter((activity) => activity.status === "Attended")
  const missedActivities = filteredActivities.filter((activity) => activity.status === "Missed")

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Activities</h1>
          <p className="text-muted-foreground">View and manage your registered and attended activities</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker onChange={setDateRange} className="w-full md:w-auto" placeholder="Filter by date" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6" onValueChange={setSelectedStatus}>
        <TabsList className="mb-4">
          {statusOptions.map((status) => (
            <TabsTrigger key={status.value} value={status.value}>
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-0">
          {filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium">No activities found</h3>
              <p className="text-muted-foreground">Try changing your filters or search for something else</p>
              <Button asChild className="mt-4">
                <Link href="/activities">Browse Activities</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Registered" className="mt-0">
          {registeredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium">No registered activities</h3>
              <p className="text-muted-foreground">You haven't registered for any activities yet</p>
              <Button asChild className="mt-4">
                <Link href="/activities">Browse Activities</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {registeredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Attended" className="mt-0">
          {attendedActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium">No attended activities</h3>
              <p className="text-muted-foreground">You haven't attended any activities yet</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attendedActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Missed" className="mt-0">
          {missedActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium">No missed activities</h3>
              <p className="text-muted-foreground">You haven't missed any activities</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {missedActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ActivityCard({ activity }: { activity: (typeof activities)[0] }) {
  const statusColors = {
    Registered: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Attended: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Missed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={activity.image || "/placeholder.svg"}
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
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{activity.time}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{activity.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline">{activity.category}</Badge>
          <Badge className={statusColors[activity.status as keyof typeof statusColors]}>{activity.status}</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
