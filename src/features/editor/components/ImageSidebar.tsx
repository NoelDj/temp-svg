import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetImages } from "@/features/images/api/UseGetImages";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cacheData } from "@/features/images/constants";

interface ImageSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function ImageSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ImageSidebarProps) {
    //const {data, isLoading, isError} = useGetImages()
    const {data, isLoading, isError} = {
        data: cacheData,
        isLoading: false,
        isError: ''
    }

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] flex flex-col",
            activeTool === "images" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Images"
                description="Add images to canvas"
            />
            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                <Loader className="size-4 text-muted-foreground animate-spin" />
                </div>
            )}
            {isError && (
                <div className="flex items-center justify-center flex-1 gap-2">
                    <AlertTriangle />
                    <p>Failed to fetch</p>
                </div>
            )}
            <ScrollArea className="flex-1">
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 h-[200px]">
                        {data && data.map((image) => {
                            return (
                                <button
                                onClick={() => editor?.addImage(image.urls.regular)}
                                key={image.id}
                                className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                                >
                                <Image
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    src={image.urls.small}
                                    alt={image.alt_description || "Image"}
                                    className="object-cover"
                                />
                                <Link
                                    target="_blank"
                                    href={image.links.html}
                                    className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                                >
                                    {image.user.name}
                                </Link>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}