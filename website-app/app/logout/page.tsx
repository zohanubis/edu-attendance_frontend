"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem("token")

    // Redirect to home page after a short delay
    const timeout = setTimeout(() => {
      router.push("/")
    }, 1500)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <h1 className="mt-4 text-xl font-semibold">Signing out...</h1>
      <p className="text-muted-foreground">You will be redirected to the home page.</p>
    </div>
  )
}
