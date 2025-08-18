import type React from "react"
import type { Metadata } from "next/types"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Sidebar } from "@/components/sidebar"
import { MobileNavigation } from "@/components/navigation"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Personal Tracker - Tu Sistema de Seguimiento Personal",
  description: "Rastrea hábitos, metas y métricas de bienestar con gamificación motivacional",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="flex min-h-screen">
              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <Sidebar />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 md:ml-80">
                {/* Mobile Navigation */}
                <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border p-4">
                  <div className="flex items-center justify-between">
                    <MobileNavigation />
                    <h1 className="font-bold">Personal Tracker</h1>
                    <div></div>
                  </div>
                </div>
                
                {children}
              </div>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
