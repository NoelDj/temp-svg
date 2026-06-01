"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, CopyIcon, FileIcon, HomeIcon, Loader, MoreHorizontal, Search, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { UseGetProjects } from "../api/UseGetProjects"
import { UseDuplicateProject } from "../api/UseDuplicateProject"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { UseUpdateProject } from "../api/UseUpdateProject"
import { useDeleteProject } from "../api/UseDeleteproject"
import { useConfirm } from "@/hooks/UseConfirm"

export const ProjectsSection = () => {
    const router = useRouter()

    const duplicateMutation = UseDuplicateProject()
    const [projectId, setProjectId] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const updateMutation = UseUpdateProject(projectId)
    const removeMutation = useDeleteProject();
    
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this project.",
    )

    const onCopy = (id: string) => {
        duplicateMutation.mutate({ id })
    }

    const onDelete = async (id: string) => {
        const ok = await confirm();

        if (ok) {
            removeMutation.mutate({ id });
        }
    }

    const {
        data,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = UseGetProjects()

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!projectName) return
        updateMutation.mutate({
            name: projectName,
        })
    }


    if (status === "pending" || removeMutation.isPending || updateMutation.isPending || duplicateMutation.isPending) {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Recent projects
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <Loader className="size-6 animate-spin text-muted-foreground" />
                </div>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Recent projects
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <AlertTriangle className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                        Failed to load projects
                    </p>
                </div>
            </div>
        )
    }

    if (!data.pages.length) {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Recent projects
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <Search className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                        No projects found
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <ConfirmDialog />
            <h3 className="font-semibold text-lg">
                Recent project
            </h3>
            <Dialog>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Rename Project</DialogTitle>
                  </DialogHeader>
              <form onSubmit={handleSubmit} id="h" className="my-2">
                  <FieldGroup>
                    <Field>
                      <Input id="project-name" name="name" value={projectName} onChange={(e) => setProjectName(e.currentTarget.value)} />
                    </Field>
                  </FieldGroup>
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" form="h">Save changes</Button>

                    </DialogClose>
                  </DialogFooter>
              </form>
                </DialogContent>
            <Table>
                <TableBody>
                    {data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.data.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="font-medium flex items-center gap-x-2 cursor-pointer"
                                    >
                                        <FileIcon className="size-6" />
                                        {project.name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer"
                                    >
                                        {project.width} x {project.height} px
                                    </TableCell>
                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer"
                                    >
                                        {formatDistanceToNow(project.updatedAt, {
                                            addSuffix: true
                                        })}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    disabled={false}
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-60">
                                                <DropdownMenuItem
                                                    className="h-10 cursor-pointer"
                                                    disabled={duplicateMutation.isPending}
                                                    onClick={() => onCopy(project.id)}
                                                >
                                                    <CopyIcon className="size-4 mr-2" />
                                                    Make a copy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="h-10 cursor-pointer"
                                                    disabled={removeMutation.isPending}
                                                    onClick={() => onDelete(project.id)}
                                                >
                                                    <Trash className="size-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="h-10 cursor-pointer"
                                                    disabled={false}
                                                    onClick={() => {
                                                      setProjectId(project.id)
                                                      setProjectName(project.name)
                                                    }}
                                                >
                                                  <Button asChild variant="none" size="none" className="font-normal w-full text-left justify-start">
                                                    <DialogTrigger className="flex gap-2">
                                                      <HomeIcon className="size-4 mr-2" />
                                                      Rename
                                                    </DialogTrigger>
                                                  </Button>
                                                   
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            </Dialog>


            {hasNextPage && (
                <div className="w-full flex items-center justify-center pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    )
}