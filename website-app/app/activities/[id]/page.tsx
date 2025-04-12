"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for a single activity
const activityData = {
  id: "1",
  title: "AI and Machine Learning Workshop",
  description: "Join the workshop to learn about practical applications of AI and Machine Learning.",
  content: `
    <p>Artificial Intelligence (AI) and Machine Learning are becoming important technologies in many fields, from healthcare and finance to education and entertainment. This workshop will introduce students to the basics of AI and Machine Learning, as well as their practical applications in real life.</p>
    
    <h3>Main content:</h3>
    <ul>
      <li>Introduction to Artificial Intelligence and Machine Learning</li>
      <li>Common Machine Learning algorithms</li>
      <li>Applications of AI in various fields</li>
      <li>Demo of real AI projects</li>
      <li>Career opportunities in AI and Machine Learning</li>
    </ul>
    
    <h3>Speakers:</h3>
    <p>Dr. Nguyen Van A - Lecturer, Faculty of Information Technology, HCMC University of Industry and Trade</p>
    <p>MSc. Tran Thi B - AI Expert at XYZ Company</p>
    
    <h3>Target audience:</h3>
    <p>Students from Information Technology, Computer Science, Software Engineering, and related fields.</p>
    
    <h3>Benefits of participation:</h3>
    <ul>
      <li>Deeper understanding of AI and Machine Learning</li>
      <li>Opportunity to connect with experts in the field</li>
      <li>Career guidance for the future</li>
      <li>Earn 1 activity point</li>
    </ul>
  `,
  date: new Date("2025-01-15"),
  time: "14:00",
  duration: "2 hours",
  location: "Hall A",
  category: "Workshop",
  points: 1,
  capacity: 100,
  registered: 80,
  organizer: "Faculty of Information Technology",
  image: "/placeholder.svg?height=400&width=800",
  isRegistered: false,
  isRegisterable: true,
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const [isRegistered, setIsRegistered] = React.useState(activityData.isRegistered)
  const [isRegistrationLoading, setIsRegistrationLoading] = React.useState(false)

  const handleRegister = () => {
    setIsRegistrationLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(true)
      setIsRegistrationLoading(false)
      toast.success("Registration successful", {
        description: "You have successfully registered for this activity.",
      })
    }, 1000)
  }

  const handleCancelRegistration = () => {
    setIsRegistrationLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(false)
      setIsRegistrationLoading(false)
      toast.success("Registration cancelled", {
        description: "You have cancelled your registration for this activity.",
      })
    }, 1000)
  }

  const isFull = activityData.registered >= activityData.capacity
  const isPast = activityData.date < new Date()
  const isRegisterable = activityData.isRegisterable

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/activities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={activityData.image || "/placeholder.svg"}
                alt={activityData.title}
                className="w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {isRegistered && <Badge className="bg-green-500 hover:bg-green-600">Registered</Badge>}
                <h1 className="text-3xl font-bold tracking-tight">{activityData.title}</h1>
              </div>
              <p className="text-muted-foreground">{activityData.description}</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{activityData.category}</Badge>
                <Badge>
                  {activityData.points} point{activityData.points !== 1 && "s"}
                </Badge>
              </div>

              <Separator />

              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: activityData.content }}
              />
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Activity Information</CardTitle>
                <CardDescription>Details about time and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">{format(activityData.date, "EEEE, MMMM dd, yyyy")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-muted-foreground">
                      {activityData.time} ({activityData.duration})
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{activityData.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Capacity</div>
                    <div className="text-muted-foreground">
                      {activityData.registered}/{activityData.capacity} registered
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium">Organizer</div>
                  <div className="text-muted-foreground">{activityData.organizer}</div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {!isRegisterable ? (
                  <Alert>
                    <AlertTitle>Non-registerable activity</AlertTitle>
                    <AlertDescription>
                      This activity is for informational purposes only and does not accept registrations.
                    </AlertDescription>
                  </Alert>
                ) : isPast ? (
                  <Alert>
                    <AlertTitle>Activity has ended</AlertTitle>
                    <AlertDescription>
                      This activity has already taken place and is no longer accepting registrations.
                    </AlertDescription>
                  </Alert>
                ) : isFull && !isRegistered ? (
                  <Alert>
                    <AlertTitle>Maximum capacity reached</AlertTitle>
                    <AlertDescription>This activity has reached its maximum registration capacity.</AlertDescription>
                  </Alert>
                ) : isRegistered ? (
                  <>
                    <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                      <AlertTitle>Registered</AlertTitle>
                      <AlertDescription>You have successfully registered for this activity.</AlertDescription>
                    </Alert>
                    <Button variant="outline" onClick={handleCancelRegistration} disabled={isRegistrationLoading}>
                      {isRegistrationLoading ? "Processing..." : "Cancel Registration"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleRegister} disabled={isRegistrationLoading}>
                    {isRegistrationLoading ? "Processing..." : "Register"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
