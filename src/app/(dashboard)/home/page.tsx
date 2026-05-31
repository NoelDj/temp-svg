import { auth } from "@/auth"
import { protectServer } from "@/features/auth/utils"
import { Banner } from "@/features/dashboard/components/Banner"
import { ProjectsSection } from "@/features/dashboard/components/ProjectSection"
import Link from "next/link"

export default async function HomePage() {

    const session = await protectServer()

    return (
        <div>
            <Banner />
            <ProjectsSection />
        </div>
    )
}