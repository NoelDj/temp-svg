"use client"

import Editor from '@/features/editor/components/Editor'
import { protectServer } from '@/features/auth/utils'
import { useGetProject } from '@/features/dashboard/api/UseGetProject'
import { Loader, TriangleAlert } from "lucide-react";
import { use } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next/types';

interface EditorProjectIdPageProps {
    params: Promise<{
        projectId: string
    }>
}

export const metadata: Metadata = {
    title: 'SVGColor Project | Manage and edit custom designs easily',
    description: 'Edit your designs easily',
}

export default function page({ params } : EditorProjectIdPageProps) {

    const { projectId } = use(params)

    const { 
        data, 
        isLoading, 
        isError
    } = useGetProject(projectId)

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="h-full flex flex-col gap-y-5 items-center justify-center">
                <TriangleAlert className="size-6 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                Failed to fetch project
                </p>
                <Button asChild variant="secondary">
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className='bg-slate-200 h-screen'>
            <Editor initialData={data}/>
        </div>
    )
}
