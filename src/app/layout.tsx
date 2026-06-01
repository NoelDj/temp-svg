import type { Metadata, Viewport } from "next"
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

export const viewport: Viewport = {
      themeColor: "#ffffff",
}

export const metadata: Metadata = {
    title: "SVGcolor",
    description: "SVGColor page",

    robots: {
        index: true,
        follow: true,
    },

    formatDetection: {
        telephone: false,
    },

    manifest: "/site.webmanifest",

    icons: {
        icon: [
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180" },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
                color: "#5bbad5",
            },
        ],
    },

    other: {
        "msapplication-TileColor": "#da532c",
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
    },
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