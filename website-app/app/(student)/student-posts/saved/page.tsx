import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for saved posts
const savedPosts = [
    {
        id: "1",
        title: "Getting Started with Next.js",
        date: "2024-04-10",
        author: "John Doe",
        image: "/images/ai-1.jpg",
        excerpt: "Learn how to build modern web applications with Next.js and React. This comprehensive guide covers the basics of Next.js, including routing, data fetching, and deployment.",
        tags: ["Next.js", "React", "Web Development", "Tutorial"]
    },
    {
        id: "3",
        title: "Machine Learning Fundamentals",
        date: "2024-04-05",
        author: "Dr. Michael Brown",
        image: "/images/ai-3.jpg",
        excerpt: "An introduction to machine learning concepts and algorithms. This post covers supervised learning, unsupervised learning, and neural networks.",
        tags: ["Machine Learning", "AI", "Data Science", "Tutorial"]
    }
]

export default function SavedPostsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Saved Posts</h1>
                    <p className="text-muted-foreground">Your bookmarked articles</p>
                </div>
                <Button asChild>
                    <Link href="/student/posts">Browse All Posts</Link>
                </Button>
            </div>

            {savedPosts.length === 0 ? (
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="text-center">
                        <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h2 className="mt-4 text-xl font-semibold">No saved posts yet</h2>
                        <p className="mt-2 text-muted-foreground">
                            When you save a post, it will appear here for easy access.
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/student/posts">Browse Posts</Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {savedPosts.map((post) => (
                        <Link key={post.id} href={`/student/posts/detail/${post.id}`}>
                            <Card className="overflow-hidden transition-all hover:shadow-md">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-4">
                                        <span className="flex items-center">
                                            <User className="mr-1 h-3 w-3" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
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
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
