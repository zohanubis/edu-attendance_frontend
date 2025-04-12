"use client"
import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Bookmark, Calendar } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for a single post
const postData = {
  id: "1",
  title: "Artificial Intelligence and Machine Learning: Practical Applications in Daily Life",
  excerpt:
    "Learn about the applications of AI and Machine Learning in everyday life and how they are changing the world.",
  content: `
    <p>Artificial Intelligence (AI) and Machine Learning are becoming increasingly common and influencing many aspects of our daily lives. From virtual assistants like Siri and Alexa to recommendation algorithms on Netflix and Spotify, AI is changing how we interact with technology and the world around us.</p>
    
    <h2>AI in Healthcare</h2>
    <p>One of the areas where AI is making the biggest impact is healthcare. Machine Learning algorithms are being used to analyze medical images, helping diagnose diseases earlier and more accurately. For example, AI can detect signs of breast cancer in mammogram images with high accuracy, helping doctors make better decisions.</p>
    
    <p>Additionally, AI is being used to develop new drugs, predict disease outbreaks, and personalize treatment plans for patients. During the COVID-19 pandemic, AI played a crucial role in tracking the spread of the virus and developing vaccines.</p>
    
    <h2>AI in Education</h2>
    <p>In education, AI is helping personalize the learning experience. Adaptive learning systems use AI to analyze student performance and adjust learning content to suit the needs and abilities of each individual.</p>
    
    <p>AI-powered chatbots are also being used to provide 24/7 support to students, answering questions and helping them understand difficult concepts. This has been particularly useful during the era of online learning due to the COVID-19 pandemic.</p>
    
    <h2>AI in Finance</h2>
    <p>In finance, AI is being used to detect fraud, assess credit risk, and automate trading. Machine Learning algorithms can analyze thousands of transactions per second to detect unusual patterns that might indicate fraudulent activity.</p>
    
    <p>Robo-advisors, which use AI to manage investment portfolios, are becoming increasingly popular. They provide personalized investment advice at a much lower cost than traditional financial advisors.</p>
    
    <h2>AI in Transportation</h2>
    <p>AI is revolutionizing the transportation industry with the development of self-driving cars. Companies like Tesla, Waymo, and Uber are investing billions of dollars in this technology, with the goal of making transportation safer, more efficient, and more convenient.</p>
    
    <p>Beyond self-driving cars, AI is also being used to optimize traffic routes, reduce congestion, and save fuel. Machine Learning algorithms can analyze real-time traffic data to predict and prevent congestion before it happens.</p>
    
    <h2>Challenges and Ethical Considerations</h2>
    <p>While AI brings many benefits, it also presents challenges and ethical considerations. One of the biggest concerns is the impact of AI on jobs. As AI automates many tasks, some jobs may disappear, requiring workers to learn new skills.</p>
    
    <p>There are also concerns about privacy and data security. AI systems often require large amounts of data to function effectively, which can lead to the collection and use of personal data in inappropriate ways.</p>
    
    <p>Finally, there are concerns about bias in AI. If the data used to train Machine Learning algorithms is biased, then the algorithms will also be biased, potentially leading to discrimination and inequality.</p>
    
    <h2>Conclusion</h2>
    <p>AI and Machine Learning are changing the world in amazing ways. From healthcare to education, finance to transportation, these technologies are helping us solve complex problems and improve our daily lives.</p>
    
    <p>However, as we continue to develop and deploy AI, it's important to consider its social and ethical implications. By doing so, we can ensure that AI is used in ways that benefit everyone.</p>
  `,
  author: {
    name: "Nguyen Thanh Tung",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Lecturer at the Faculty of Information Technology, specializing in Artificial Intelligence and Data Science.",
  },
  date: new Date("2025-01-15"),
  category: "Technology",
  image: "/placeholder.svg?height=400&width=800",
  relatedPosts: [
    {
      id: "2",
      title: "Blockchain and Cryptocurrency: Future Technology Trends",
      excerpt: "Explore Blockchain technology and how it's reshaping financial transactions and many other fields.",
      date: new Date("2025-01-22"),
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      title: "Cybersecurity and Information Security: Challenges and Solutions",
      excerpt:
        "Learn about the challenges in information security and how to protect your personal data in the digital age.",
      date: new Date("2025-01-10"),
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      title: "Modern Web Development: Technologies and New Trends",
      excerpt:
        "Explore the latest technologies and frameworks in web development and how they're changing the user experience.",
      date: new Date("2025-01-18"),
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = React.useState(false)

  const handleSavePost = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      toast.success("Post saved", {
        description: "This post has been added to your saved items.",
      })
    } else {
      toast.success("Post removed", {
        description: "This post has been removed from your saved items.",
      })
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img src={postData.image || "/placeholder.svg"} alt={postData.title} className="w-full object-cover" />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold tracking-tight">{postData.title}</h1>
                <Button variant="ghost" size="icon" onClick={handleSavePost} className={isSaved ? "text-primary" : ""}>
                  <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
                  <span className="sr-only">{isSaved ? "Unsave post" : "Save post"}</span>
                </Button>
              </div>
              <p className="text-muted-foreground">{postData.excerpt}</p>

              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={postData.author.avatar} alt={postData.author.name} />
                  <AvatarFallback>{postData.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{postData.author.name}</div>
                  <div className="text-sm text-muted-foreground">{format(postData.date, "MMMM dd, yyyy")}</div>
                </div>
              </div>

              <Badge variant="outline">{postData.category}</Badge>

              <Separator />

              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={postData.author.avatar} alt={postData.author.name} />
                    <AvatarFallback>{postData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{postData.author.name}</div>
                    <div className="text-sm text-muted-foreground">{postData.author.bio}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Related Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {postData.relatedPosts.map((post) => (
                  <div key={post.id} className="flex gap-4">
                    <div className="h-16 w-16 flex-none overflow-hidden rounded-md">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium leading-tight">
                        <Link href={`/posts/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{format(post.date, "MM/dd/yyyy")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
