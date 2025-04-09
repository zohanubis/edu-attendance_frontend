import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle2, Clock, MapPin, Users, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for attendance statistics
const statistics = {
    totalActivities: 15,
    totalParticipants: 1500,
    averageAttendance: 85,
    recentActivities: [
        {
            id: "1",
            title: "AI Seminar 2024",
            date: "2024-04-15",
            time: "2:00 PM",
            image: "/images/ai-seminar.jpg",
            location: "Main Auditorium",
            totalParticipants: 150,
            checkedIn: 100,
            status: "completed"
        },
        {
            id: "2",
            title: "Student Research Conference",
            date: "2024-04-20",
            time: "9:00 AM",
            image: "/images/research-conference.jpg",
            location: "Conference Hall",
            totalParticipants: 100,
            checkedIn: 75,
            status: "upcoming"
        }
    ]
}

export default function StudentAttendanceDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Attendance Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalActivities}</div>
                        <p className="text-xs text-muted-foreground">
                            Activities managed
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalParticipants}</div>
                        <p className="text-xs text-muted-foreground">
                            Students attended
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.averageAttendance}%</div>
                        <p className="text-xs text-muted-foreground">
                            Across all activities
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Activities</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            Next 7 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="recent" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="recent">Recent Activities</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {statistics.recentActivities.map((activity) => (
                            <Card key={activity.id} className="overflow-hidden">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute right-2 top-2">
                                        {activity.status === "completed" ? (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                Upcoming
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{activity.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(activity.date).toLocaleDateString()}
                                    </CardDescription>
                                    <CardDescription className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {activity.time}
                                    </CardDescription>
                                    <CardDescription className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {activity.location}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Attendance</span>
                                            <span className="text-sm font-medium">
                                                {activity.checkedIn}/{activity.totalParticipants}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{
                                                    width: `${(activity.checkedIn / activity.totalParticipants) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {statistics.recentActivities
                            .filter(activity => activity.status === "upcoming")
                            .map((activity) => (
                                <Card key={activity.id} className="overflow-hidden">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={activity.image}
                                            alt={activity.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute right-2 top-2">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                Upcoming
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{activity.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(activity.date).toLocaleDateString()}
                                        </CardDescription>
                                        <CardDescription className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            {activity.time}
                                        </CardDescription>
                                        <CardDescription className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {activity.location}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Registered</span>
                                                <span className="text-sm font-medium">
                                                    {activity.checkedIn}/{activity.totalParticipants}
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                                <div
                                                    className="h-full bg-primary transition-all"
                                                    style={{
                                                        width: `${(activity.checkedIn / activity.totalParticipants) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
