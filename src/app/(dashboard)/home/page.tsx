import { auth } from "@/auth"
import { protectServer } from "@/features/auth/utils"
import { Banner } from "@/features/dashboard/components/Banner"
import { ProjectsSection } from "@/features/dashboard/components/ProjectSection"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: 'SVGColor Projecst View',
    description: 'Manage SVGColor projects',
}

export default async function HomePage() {

    await protectServer()

    return (
        <div>
            <Banner />
            <ProjectsSection />
        </div>
    )
}