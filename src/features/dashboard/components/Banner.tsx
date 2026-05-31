"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCreateProject } from "../api/UseCreateProject"

export const Banner = () => {
    const router = useRouter()
    const mutation = useCreateProject()

    const handleClick = () => {
        mutation.mutate(
            {
                name: "Untitled project",
                json: "",
                width: 900,
                height: 1200,
            },
            {
                onSuccess: ({ data }) => {
                router.push(`/editor/${data.id}`)
                },
            },
        )
    }

    return (
        <div className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#2ecb39] via-[#32d021] to-[#16940b]">
            <div className="rounded-full size-28 items-center justify-center bg-white/50 hidden md:flex">
                <div className="rounded-full size-20 flex items-center justify-center bg-white">
                    <Sparkles className="h-20 text-primary fill-primary" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-xl md:text-3xl font-semibold">Start your next project with SVGColor</h1>
                <p className="text-xs md:text-sm mb-2">Create stunning visuals in seconds using SVGColor</p>
                <Button onClick={handleClick} variant="secondary" className="w-[160px]" disabled={mutation.isPending} >Create project<ArrowRight className="size-4 ml-2" /></Button>
            </div>
        </div>
    )
}