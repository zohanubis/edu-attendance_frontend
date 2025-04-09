import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

// Mock data for posts
const posts = [
    {
        id: "1",
        title: "Getting Started with Next.js",
        date: "2024-04-10",
        author: "John Doe",
        image: "/images/ai-1.jpg",
        excerpt: "Learn how to build modern web applications with Next.js and React. This comprehensive guide covers the basics of Next.js, including routing, data fetching, and deployment.",
        tags: ["Next.js", "React", "Web Development", "Tutorial"],
        content: `
# Getting Started with Next.js

Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. In this guide, we'll explore the key features and concepts that make Next.js a great choice for modern web development.

## Why Next.js?

- **Server-Side Rendering (SSR)**: Improve performance and SEO
- **Static Site Generation (SSG)**: Build fast, static websites
- **API Routes**: Create backend functionality within your Next.js app
- **File-System Based Routing**: Intuitive page routing
- **Built-in CSS Support**: Style your components easily

## Getting Started

1. Create a new Next.js project:
   \`\`\`bash
   npx create-next-app@latest my-app
   \`\`\`

2. Navigate to your project:
   \`\`\`bash
   cd my-app
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Key Concepts

### Pages and Routing

Next.js uses a file-system based router. Files in the \`pages\` directory automatically become routes:

- \`pages/index.js\` → \`/\`
- \`pages/about.js\` → \`/about\`
- \`pages/posts/[id].js\` → \`/posts/1\`, \`/posts/2\`, etc.

### Data Fetching

Next.js provides multiple methods for data fetching:

\`\`\`typescript
// Server-side rendering
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return { props: { data } }
}

// Static generation
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return { props: { data } }
}
\`\`\`

## Best Practices

1. Use TypeScript for better type safety
2. Implement proper error handling
3. Optimize images using the Image component
4. Follow the file-system based routing conventions
5. Use environment variables for configuration

## Conclusion

Next.js provides a robust foundation for building modern web applications. Its features like SSR, SSG, and API routes make it a versatile choice for various use cases.

For more information, check out the [Next.js documentation](https://nextjs.org/docs).
    `
    },
    {
        id: "2",
        title: "Understanding TypeScript",
        date: "2024-04-08",
        author: "Jane Smith",
        image: "/images/ai-2.jpg",
        excerpt: "A comprehensive guide to TypeScript for JavaScript developers. Learn about types, interfaces, generics, and how TypeScript can improve your code quality.",
        tags: ["TypeScript", "JavaScript", "Programming", "Tutorial"],
        content: `
# Understanding TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing and class-based object-oriented programming to the language.

## Why TypeScript?

- Catch errors early in development
- Better IDE support with intelligent code completion
- Enhanced code documentation
- Improved maintainability
- Better refactoring capabilities

## Basic Types

\`\`\`typescript
// Basic types
let isDone: boolean = false;
let lines: number = 42;
let name: string = "TypeScript";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// Enums
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void
function warnUser(): void {
    console.log("This is a warning message");
}
\`\`\`

## Interfaces

\`\`\`typescript
interface User {
    name: string;
    id: number;
    email?: string; // Optional property
}

function printUser(user: User) {
    console.log(\`User: \${user.name} (ID: \${user.id})\`);
}
\`\`\`

## Generics

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
\`\`\`

## Best Practices

1. Always use strict mode
2. Leverage type inference when possible
3. Use interfaces for object shapes
4. Implement proper error handling
5. Use generics for reusable components

## Conclusion

TypeScript enhances JavaScript development by adding static typing and other features that help catch errors early and improve code quality.

For more information, visit the [TypeScript documentation](https://www.typescriptlang.org/docs/).
    `
    }
]

export default function PublicPostDetailPage({ params }: { params: { id: string } }) {
    const post = posts.find((p) => p.id === params.id)

    if (!post) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                    <p className="text-muted-foreground">The post you're looking for doesn't exist.</p>
                    <Button asChild className="mt-4">
                        <Link href="/public-posts">Back to Posts</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="relative h-[400px] w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="mx-auto max-w-3xl space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {post.author}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                    </div>
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
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <div className="flex justify-between border-t pt-6">
                    <Button variant="outline" asChild>
                        <Link href="/public-posts">Back to Posts</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
