import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the Student Activity Management System",
}

export default function LoginPage() {
  return <LoginPageClient />
}
