import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for activities
const activities = [
    {
        id: "1",
        title: "AI Seminar 2024",
        date: "2024-04-15",
        image: "/images/ai-seminar.jpg",
        description: "Join us for an exciting seminar on the latest developments in AI technology.",
        location: "Main Auditorium",
        status: "upcoming"
    },
    {
        id: "2",
        title: "Student Research Conference",
        date: "2024-04-20",
        image: "/images/research-conference.jpg",
        description: "Present your research findings and network with fellow students.",
        location: "Conference Hall",
        status: "upcoming"
    },
    {
        id: "3",
        title: "Career Fair 2024",
        date: "2024-04-25",
        image: "/images/career-fair.jpg",
        description: "Connect with potential employers and explore career opportunities.",
        location: "Student Center",
        status: "upcoming"
    }
]

export default function StudentActivities() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Activities</h1>
                <Link href="/student-activities/history">
                    <Button variant="outline">View History</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                    <Link key={activity.id} href={`/student-activities/${activity.id}`}>
                        <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    fill
                                    className="object-cover"
                                />
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
                                <Button className="mt-4 w-full">Register Now</Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
} 