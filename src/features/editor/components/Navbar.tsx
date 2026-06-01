"use client"

import Logo from './Logo'
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { CiFileOn } from "react-icons/ci"
import { cn } from "@/lib/utils"
import { useFilePicker } from "use-file-picker"
import { 
  ChevronDown, 
  Download, 
  Loader, 
  MousePointerClick, 
  Redo2, 
  SaveIcon, 
  Undo2
} from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { Hint } from '@/components/Hint'
import { ActiveTool, Editor } from '../types'
import { UserButton } from '@/features/auth/components/UserButton'
import { TimeoutCallback, useMutationState } from '@tanstack/react-query'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { UseUpdateProject } from '@/features/dashboard/api/UseUpdateProject'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

interface NavbarProps {
    id?: string
    name: string
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    isAuthenticated: boolean
}
export default function Navbar({
    id,
    editor,
    activeTool,
    onChangeActiveTool,
    isAuthenticated,
    name
}: NavbarProps) {
    
    const { openFilePicker } = useFilePicker({
        accept: ".json",
            onFilesSuccessfullySelected: ({ plainFiles }: any) => {
                if (plainFiles && plainFiles.length > 0) {
                        const file = plainFiles[0]
                        const reader = new FileReader()
                        reader.readAsText(file, "UTF-8")
                        reader.onload = () => {
                            editor?.loadJson(reader.result as string)
                        }
                }
            },
    })

    return (
        <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
            <Logo />
            <div className="w-full flex items-center gap-x-1 h-full">
                <Separator orientation="vertical" className="mx-2" />
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                        File
                        <ChevronDown className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-60">
                        <DropdownMenuItem
                            onClick={() => openFilePicker()} 
                            className="flex items-center gap-x-2"
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>Open</p>
                                <p className="text-xs text-muted-foreground">
                                Open a JSON file
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="mx-2" />
                <Hint label="Select" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onChangeActiveTool("select")}
                        className={cn(activeTool === "select" && "bg-gray-200")}
                    >
                        <MousePointerClick className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Undo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canUndo()}
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.onUndo()}
                        className={cn(activeTool === "select" && "bg-gray-100")}
                    >
                        <Undo2 className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Redo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canRedo()}
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.onRedo()}
                        className={cn(activeTool === "select" && "bg-gray-100")}
                    >
                        <Redo2 className="size-4" />
                    </Button>
                </Hint>
                {(isAuthenticated && id) ? (
                    <>
                        <Separator orientation="vertical" className="mx-4" />
                        <ProjectInputName id={id} name={name}/> 
                        <Separator orientation="vertical" className="mx-4" />
                        <SavedStatusIndicator id={id} />
                    </>
                ) : <LoginButton />}
                <div className="ml-auto flex items-center gap-x-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary" className='border border-black py-4 px-3 flex items-center'>
                            Export
                            <Download className="size-4 ml-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-60">
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveAsJson()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                            <p>JSON</p>
                            <p className="text-xs text-muted-foreground">
                                Save for later editing
                            </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveAsFile('png')}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                            <p>PNG</p>
                            <p className="text-xs text-muted-foreground">
                                Best for sharing on the web
                            </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveAsFile('jpg')}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                            <p>JPG</p>
                            <p className="text-xs text-muted-foreground">
                                Best for printing
                            </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.exportAsSvg()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                            <p>SVG</p>
                            <p className="text-xs text-muted-foreground">
                                Best for editing in vector software
                            </p>
                            </div>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}

function LoginButton () {
    return (
        <Button variant="secondary" className='border border-slate-400 text-slate-800'>
            Save <SaveIcon />
        </Button>
    )
}
{/* <Link href="/sign-in"></Link> */}

function ProjectInputName({id, name: initialName }: { id: string, name: string}) {
    const { mutate } = UseUpdateProject(id)

    const [name, setName] = useState(initialName)

    useEffect(() => {
        setName(initialName)
    }, [initialName])

    const debouncedSave = useMemo(
        () =>
        debounce((value: string) => {
            mutate({ name: value })
        }, 500),
        [mutate]
    )

    useEffect(() => {
        return () => {
            debouncedSave.cancel()
        }
    }, [debouncedSave])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value

        setName(value)
        debouncedSave(value)
    }

    return (
        <div className="w-62.5">
            <Input onChange={handleChange} value={name} />
        </div>
    )
}

function SavedStatusIndicator ({id}: {id: string}) {

    const data = useMutationState({
        filters: {
            mutationKey: ["project", { id }],
            exact: true,
        },
        select: (mutation) => mutation.state.status,
    })

    const currentStatus = data[data.length - 1]

    const isError = currentStatus === "error"
    const isPending = currentStatus === "pending"


    return <div>
        {isPending && ( 
            <div className="flex items-center gap-x-2">
                <Loader className="size-4 animate-spin text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                Saving...
                </div>
            </div>
        )}
        {!isPending && isError && ( 
            <div className="flex items-center gap-x-2">
                <BsCloudSlash className="size-[20px] text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                Failed to save
                </div>
            </div>
        )}
        {!isPending && !isError && ( 
            <div className="flex items-center gap-x-2">
                <BsCloudCheck className="size-[20px] text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                Saved
                </div>
            </div>
        )}
    </div>
}
