import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, MapPin, Users, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for activities to manage attendance
const activities = [
    {
        id: "1",
        title: "AI Seminar 2024",
        date: "2024-04-15",
        time: "2:00 PM",
        image: "/images/ai-seminar.jpg",
        location: "Main Auditorium",
        totalParticipants: 150,
        checkedIn: 100,
        status: "active"
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
    },
    {
        id: "3",
        title: "Career Fair 2024",
        date: "2024-04-25",
        time: "10:00 AM",
        image: "/images/career-fair.jpg",
        location: "Student Center",
        totalParticipants: 300,
        checkedIn: 0,
        status: "upcoming"
    }
]

export default function StudentAttendanceManage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Attendance</h1>
                <Link href="/student-attendance/dashboard">
                    <Button variant="outline">View Dashboard</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                    <Card key={activity.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                            <Image
                                src={activity.image}
                                alt={activity.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute right-2 top-2">
                                {activity.status === "active" ? (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Active
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
                                <Button className="w-full" disabled={activity.status !== "active"}>
                                    Manage Check-in
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
