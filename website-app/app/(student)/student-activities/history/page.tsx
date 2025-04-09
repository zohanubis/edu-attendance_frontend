import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, CheckCircle2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for activity history
const activities = [
    {
        id: "1",
        title: "Web Development Workshop",
        date: "2024-03-15",
        image: "/images/web-dev.jpg",
        description: "Learn modern web development techniques and best practices.",
        location: "Computer Lab 1",
        status: "attended"
    },
    {
        id: "2",
        title: "Student Leadership Training",
        date: "2024-03-10",
        image: "/images/leadership.jpg",
        description: "Develop leadership skills and learn team management.",
        location: "Conference Room A",
        status: "attended"
    },
    {
        id: "3",
        title: "Tech Career Fair 2024",
        date: "2024-03-05",
        image: "/images/career-fair.jpg",
        description: "Connect with tech companies and explore career opportunities.",
        location: "Student Center",
        status: "missed"
    }
]

export default function StudentActivityHistory() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Activity History</h1>
                <Link href="/student-activities">
                    <Button variant="outline">View Upcoming Activities</Button>
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
                                {activity.status === "attended" ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-red-500" />
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
                                <MapPin className="h-4 w-4" />
                                {activity.location}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <div className="mt-4">
                                <span className={`text-sm font-medium ${activity.status === "attended" ? "text-green-500" : "text-red-500"
                                    }`}>
                                    {activity.status === "attended" ? "Attended" : "Missed"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 