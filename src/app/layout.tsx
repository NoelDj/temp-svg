import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/Provider"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"


const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-sans'})

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "SVGcolor",
    description: "Change svg color online",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth()

    return (
        <SessionProvider session={session}>
            <html lang="en" className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", spaceGrotesk.variable)}>
                <body className="min-h-full flex flex-col">
                    <Providers>
                        <Toaster />
                        {children}
                    </Providers>
                </body>
            </html>
        </SessionProvider>
    )
}