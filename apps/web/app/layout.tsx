"use client"

// import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  SidebarProvider,
  SidebarInset
} from 'components/ui'

import {
  Sidebar
} from "components"
import { Header } from "components"

const roboto = Roboto({
  variable: "--font-roboto",
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
      <body className={`${roboto.className}`}>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <Sidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
