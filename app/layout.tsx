import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Solisfortitudo - Fitness Calculators",
  description: "Calculate your calories, macros, and BMI with our fitness tools",
  keywords: "fitness calculator, calorie calculator, BMI calculator, macro calculator",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-background`}
      >
        <Navbar />
        <main className="flex-1 w-full py-6 sm:py-8 md:py-10">
          {children}
        </main>
        <footer className="w-full border-t py-4 sm:py-6 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Solisfortitudo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}