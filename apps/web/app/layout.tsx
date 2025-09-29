"use client"

// import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google"
import "./globals.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const noto_sans  = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={`${noto_sans.className}`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
