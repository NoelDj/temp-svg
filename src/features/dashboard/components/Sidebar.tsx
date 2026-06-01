//import { Logo } from "./logo";
//import { SidebarRoutes } from "./sidebar-routes";

import Link from "next/link"
import Image from "next/image";

import { SidebarRoutes } from "./SidebarRoutes"
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    return (
        <aside className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
            <Logo />
            <SidebarRoutes />
        </aside>
    )
}



function Logo () {
    return (
        <Link href="/" className="p-4">
            <Image src="/images/svgcolor-logo.png" alt="SVGColor logo" width={131} height={40}/>
        </Link>
    )
}