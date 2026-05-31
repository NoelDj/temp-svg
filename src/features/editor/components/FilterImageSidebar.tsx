import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { FILL_COLOR, fonts, imageFilters, linuxSafeFonts, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../contstants/constants";
import { Button } from "@/components/ui/button";

interface ImageFilterSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function ImageFilterSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ImageFilterSidebarProps) {

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "filter" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Filter"
                description="Apply filter to image"
            />
            <ScrollArea className="min-h-0">
                <div className="p-4 space-y-1 border-b max-h-[300px]">
                    {imageFilters.map((filter) => (
                        <Button
                            key={filter}
                            variant="secondary"
                            size="lg"
                            className="w-full h-16 justify-start text-left"
                            onClick={() => editor?.changeImageFilter(filter)}
                        >{filter}</Button>
                    ))}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}