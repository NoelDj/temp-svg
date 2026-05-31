"use client"

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Loader, LogInIcon, SquarePenIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";

export default function Header() {

    const session = useSession()

    const links = [
        {link: "/", name: "Pricing"},
        {link: "/", name: "Premium"},
        {link: "/", name: "About"},
        {link: "/", name: "Contact"}
    ]

    const isLoading = session.status === "loading"
    const isAuthenticated = session.status === "unauthenticated" || !session.data

    return (
        <header className="w-full bg-white shadow-md px-18">
            <div className="mx-auto flex items-center justify-between rounded-xl py-4">
                
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <img src="logo.svg" alt="logo" width={35} />
                        <span className="font-semibold tracking-tight text-gray-900">SVGColor</span>
                    </div>
                </Link>
                
                <nav className="flex items-center gap-12 text-sm text-gray-800">
                    {
                        links.map(({link, name}) => (
                            <a href="#" className="cursor-pointer hover:text-primary" key={name}>{name}</a>
                        ))
                    }
                </nav>

                <div className="flex gap-4">
                    {
                        isLoading && <Loader className="size-4 animate-spin text-muted-foreground" />
                    }

                    {
                        !isAuthenticated && <>
                            <Button className="rounded-full border border-primary px-4 py-2 font-medium text-gray-900 transition hover:bg-primary-500 flex items-center gap-2">
                                <Link href="/home" className="flex gap-2 items-center">Projects<RxDashboard size={20} /></Link>
                            </Button>
                            <Button onClick={() => signOut()} className="rounded-full border border-primary px-4 py-2 font-medium text-gray-900 transition hover:bg-primary-500 flex items-center gap-2">
                                <span className="flex gap-2 items-center">Sign Out<User2Icon size={20} /></span>
                            </Button>
                        </>
                    }
                    
                    {
                        isAuthenticated && <>
                            <Button className="rounded-full border border-primary px-4 py-2 font-medium text-gray-900 transition hover:bg-primary-500 flex items-center gap-2">
                                <Link href="/sign-in" className="flex gap-2 items-center">Sign In<LogInIcon size={20} /></Link>
                            </Button>
                            <Button className="rounded-full border border-primary px-4 py-2 font-medium text-gray-900 transition hover:bg-primary-500 flex items-center gap-2">
                                <Link href="/sign-up" className="flex gap-2 items-center">Sign Up<SquarePenIcon size={20} /></Link>
                            </Button>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}