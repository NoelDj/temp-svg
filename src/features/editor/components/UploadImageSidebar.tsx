import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { UploadButton } from "@/lib/uploadthing";



import { OurFileRouter } from "@/app/api/uploadthing/core";
import { MultiUploader } from "./FileUploadDropzone";


interface UploadImageSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function UploadImageSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: UploadImageSidebarProps) {
    //const {data, isLoading, isError} = useGetImages()

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] flex flex-col",
            activeTool === "upload" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Upload files"
                description="Upload your files to canvas"
            />
            <ScrollArea className="flex-1">
                <div className="p-4">
                    <MultiUploader editor={editor}/>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}