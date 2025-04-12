"use client"

import Image from "next/image"
import { UserAuthForm } from "@/components/user-auth-form"
import Link from "next/link"

export default function LoginPageClient() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://placehold.co/1360x1020/gray/white"
            fill
            alt="HUIT Campus"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <img
              src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
              alt="HUIT Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"Student Activity Management System - HUIT University of Industry and Trade"</p>
            <footer className="text-sm">Student Affairs Office</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
          </div>
          <UserAuthForm />
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary underline underline-offset-4">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
