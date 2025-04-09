import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

// Mock data for activities
const activities = [
    {
        id: "1",
        title: "AI Seminar 2024",
        date: "2024-04-15",
        time: "2:00 PM",
        location: "Main Auditorium",
        participants: "100/150",
        image: "/images/ai-seminar.jpg",
        description: "Join us for an exciting seminar on the latest developments in AI technology. This event will feature industry experts sharing their insights on machine learning, deep learning, and artificial intelligence applications.",
        tags: ["Technology", "AI", "Seminar"],
        content: `
# AI Seminar 2024

## Overview
Join us for an exciting seminar on the latest developments in AI technology. This event brings together industry experts, researchers, and students to explore the cutting-edge advancements in artificial intelligence.

## Agenda
- **2:00 PM - 2:30 PM**: Registration and Welcome
- **2:30 PM - 3:30 PM**: Keynote Speech: "The Future of AI" by Dr. Jane Smith
- **3:30 PM - 4:30 PM**: Panel Discussion: "Ethics in AI Development"
- **4:30 PM - 5:00 PM**: Q&A Session
- **5:00 PM - 6:00 PM**: Networking Reception

## Speakers
- **Dr. Jane Smith**: Professor of Computer Science, AI Research Lab
- **John Doe**: CTO, Tech Innovations Inc.
- **Sarah Johnson**: AI Ethics Researcher

## What to Expect
- Learn about the latest AI technologies and their applications
- Network with industry professionals and researchers
- Gain insights into ethical considerations in AI development
- Participate in interactive discussions and Q&A sessions

## Registration
Please register for this event by clicking the "Register" button below. Space is limited, so early registration is recommended.

## Additional Information
For any questions, please contact the event organizer at events@university.edu.
    `,
        requirements: [
            "Bring your student ID",
            "Laptop (optional)",
            "Pre-registration required"
        ],
        schedule: [
            {
                time: "2:00 PM",
                title: "Opening Remarks"
            },
            {
                time: "2:30 PM",
                title: "Keynote Speech: Future of AI"
            },
            {
                time: "3:30 PM",
                title: "Panel Discussion"
            },
            {
                time: "4:30 PM",
                title: "Q&A Session"
            },
            {
                time: "5:00 PM",
                title: "Networking"
            }
        ]
    },
    {
        id: "2",
        title: "Student Research Conference",
        date: "2024-04-20",
        time: "9:00 AM",
        location: "Conference Hall",
        participants: "75/100",
        image: "/images/29_03_2025_SVNCKH.jpg",
        description: "Present your research findings and network with fellow students.",
        tags: ["Research", "Conference", "Networking"],
        content: `
# Student Research Conference 2024

## Overview
The Student Research Conference is an annual event that provides students with the opportunity to present their research findings to peers, faculty, and industry professionals.

## Conference Tracks
- Computer Science and Engineering
- Business and Economics
- Social Sciences
- Humanities and Arts

## Submission Guidelines
- Abstract submission deadline: March 15, 2024
- Full paper submission deadline: April 1, 2024
- Presentation format: 15-minute oral presentation + 5-minute Q&A

## Keynote Speaker
**Dr. Michael Brown**: Renowned researcher in the field of artificial intelligence and machine learning.

## Schedule
- **9:00 AM - 10:00 AM**: Registration and Welcome
- **10:00 AM - 11:00 AM**: Keynote Speech
- **11:00 AM - 12:30 PM**: Parallel Sessions
- **12:30 PM - 1:30 PM**: Lunch Break
- **1:30 PM - 3:00 PM**: Parallel Sessions
- **3:00 PM - 4:00 PM**: Poster Session
- **4:00 PM - 5:00 PM**: Awards Ceremony

## Registration
Please register for this event by clicking the "Register" button below. Early registration is recommended.
    `
    },
    {
        id: "3",
        title: "AI Workshop: Hands-on Machine Learning",
        date: "2024-04-25",
        time: "1:00 PM",
        location: "Computer Lab 3",
        participants: "30/30",
        image: "/images/ai-3.jpg",
        description: "Practical workshop on implementing machine learning algorithms.",
        tags: ["Workshop", "Machine Learning", "Hands-on"],
        content: `
# AI Workshop: Hands-on Machine Learning

## Overview
This hands-on workshop will guide you through the process of implementing machine learning algorithms from scratch. No prior experience with machine learning is required, but basic programming knowledge is recommended.

## What You'll Learn
- Fundamentals of machine learning
- Data preprocessing techniques
- Implementation of common algorithms (Linear Regression, Logistic Regression, Decision Trees)
- Model evaluation and validation
- Practical applications of machine learning

## Prerequisites
- Basic knowledge of Python
- Laptop with Python installed
- Jupyter Notebook

## Workshop Materials
All workshop materials will be provided electronically before the event. Please bring your laptop with the required software installed.

## Schedule
- **1:00 PM - 1:30 PM**: Introduction and Setup
- **1:30 PM - 3:00 PM**: Hands-on Session 1
- **3:00 PM - 3:30 PM**: Break
- **3:30 PM - 5:00 PM**: Hands-on Session 2
- **5:00 PM - 5:30 PM**: Q&A and Wrap-up

## Registration
Please register for this workshop by clicking the "Register" button below. Space is limited to 30 participants.
    `
    },
    {
        id: "4",
        title: "Tech Career Fair",
        date: "2024-05-01",
        time: "10:00 AM",
        location: "Exhibition Center",
        participants: "200/300",
        image: "/images/29_03_2025_SVNCKH1.jpg",
        description: "Connect with tech companies and explore career opportunities.",
        tags: ["Career", "Networking", "Tech"],
        content: `
# Tech Career Fair 2024

## Overview
The Tech Career Fair brings together leading technology companies and talented students for networking and recruitment opportunities.

## Participating Companies
- Google
- Microsoft
- Amazon
- Apple
- Facebook
- And many more!

## What to Expect
- Meet with recruiters from top tech companies
- Learn about internship and job opportunities
- Attend company presentations and workshops
- Get your resume reviewed by industry professionals
- Participate in on-site interviews

## Preparation Tips
- Bring multiple copies of your resume
- Dress professionally
- Research participating companies beforehand
- Prepare your elevator pitch
- Follow up with recruiters after the event

## Schedule
- **10:00 AM - 11:00 AM**: Registration and Welcome
- **11:00 AM - 12:00 PM**: Company Presentations
- **12:00 PM - 1:00 PM**: Lunch Break
- **1:00 PM - 4:00 PM**: Networking and Interviews
- **4:00 PM - 5:00 PM**: Resume Review and Career Counseling

## Registration
Please register for this event by clicking the "Register" button below. Early registration is recommended.
    `
    }
]

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
    const activity = activities.find(a => a.id === params.id)

    if (!activity) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{activity.title}</h1>
                    <p className="text-muted-foreground">{activity.description}</p>
                </div>
                <Button>Register</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <div className="relative h-64 w-full">
                            <Image
                                src={activity.image}
                                alt={activity.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardContent className="pt-6">
                            <div className="prose dark:prose-invert max-w-none">
                                <ReactMarkdown>{activity.content}</ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{new Date(activity.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{activity.time}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{activity.participants} participants</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {activity.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Related Activities</CardTitle>
                            <CardDescription>You might also be interested in</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activities
                                    .filter(a => a.id !== activity.id)
                                    .slice(0, 2)
                                    .map((relatedActivity) => (
                                        <Link
                                            key={relatedActivity.id}
                                            href={`/student/activities/${relatedActivity.id}`}
                                            className="block"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="relative h-16 w-16 flex-shrink-0">
                                                    <Image
                                                        src={relatedActivity.image}
                                                        alt={relatedActivity.title}
                                                        fill
                                                        className="rounded-md object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{relatedActivity.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(relatedActivity.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 