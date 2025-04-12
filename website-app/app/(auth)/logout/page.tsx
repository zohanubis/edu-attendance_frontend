"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    // Log out the user
    logout()

    // Redirect to home page after a short delay
    const timeout = setTimeout(() => {
      router.push("/")
    }, 1500)

    return () => clearTimeout(timeout)
  }, [router, logout])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <h1 className="mt-4 text-xl font-semibold">Signing out...</h1>
      <p className="text-muted-foreground">You will be redirected to the home page.</p>
    </div>
  )
}
