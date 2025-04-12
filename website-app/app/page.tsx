import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  // Featured activities
  const featuredActivities = [
    {
      id: "1",
      title: "AI and Machine Learning Workshop",
      description: "Join the workshop to learn about practical applications of AI and Machine Learning.",
      date: "01/15/2025",
      time: "14:00",
      location: "Hall A",
      category: "Workshop",
      points: 1,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      title: "Blockchain and Cryptocurrency Workshop",
      description: "Learn about Blockchain technology and its applications in various fields.",
      date: "02/22/2025",
      time: "14:00",
      location: "Hall B",
      category: "Workshop",
      points: 1,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "Cybersecurity and Information Security Workshop",
      description: "Learn about cybersecurity issues and how to protect personal information on the internet.",
      date: "03/10/2025",
      time: "14:00",
      location: "Hall C",
      category: "Workshop",
      points: 1,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Latest posts
  const latestPosts = [
    {
      id: "1",
      title: "Artificial Intelligence and Machine Learning: Practical Applications in Daily Life",
      excerpt:
        "Learn about the applications of AI and Machine Learning in everyday life and how they are changing the world.",
      date: "01/15/2025",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      title: "Blockchain and Cryptocurrency: Future Technology Trends",
      excerpt: "Explore Blockchain technology and how it's reshaping financial transactions and many other fields.",
      date: "01/22/2025",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "Cybersecurity and Information Security: Challenges and Solutions",
      excerpt:
        "Learn about the challenges in information security and how to protect your personal data in the digital age.",
      date: "01/10/2025",
      category: "Security",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">HUIT Student Portal</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Student Activity Management System - HCMC University of Industry and Trade
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/activities">View Activities</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Activities Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Activities</h2>
              <p className="text-muted-foreground">Upcoming activities at the university</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link href="/activities">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredActivities.map((activity) => (
              <Card key={activity.id} className="flex flex-col overflow-hidden">
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
                    <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="outline">{activity.category}</Badge>
                    <Badge>
                      {activity.points} point{activity.points !== 1 && "s"}
                    </Badge>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Button asChild variant="ghost">
              <Link href="/activities">
                View All Activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
              <p className="text-muted-foreground">News and announcements from the university</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link href="/posts">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-2">
                      <Link href={`/posts/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="border-t bg-background/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="text-sm text-muted-foreground">{post.date}</div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Button asChild variant="ghost">
              <Link href="/posts">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-lg bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Are you ready to join activities?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Sign in to register for activities and earn activity points
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">Sign In Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
