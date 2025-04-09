"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, ClipboardList, User } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/student-activities">
                    <Card className="hover:bg-accent">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Activities</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">
                                Upcoming activities
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/student-activities/history">
                    <Card className="hover:bg-accent">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">History</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                Past activities
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/student-posts">
                    <Card className="hover:bg-accent">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Posts</CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">
                                Available posts
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/student-profile">
                    <Card className="hover:bg-accent">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">View</div>
                            <p className="text-xs text-muted-foreground">
                                Your profile
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
} 