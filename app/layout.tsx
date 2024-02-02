import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { cn } from '../lib/utils'
import './globals.css'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { ThemeProvider } from '@/context/ThemeProvider'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Nuestros gastos',
  description: 'Control de gastos en pareja',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider attribute='class' disableTransitionOnChange>
          <SessionAuthProvider session={session}>
            {children}
          </SessionAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
