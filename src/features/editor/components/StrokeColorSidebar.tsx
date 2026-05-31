import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./ColorPicker";
import { FILL_COLOR, STROKE_COLOR } from "../contstants/constants";
import { useEffect, useState } from "react";

interface StrokeColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function StrokeColorSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeColorSidebarProps) {
    const value = editor?.getActiveStrokeColor() || STROKE_COLOR;
    
    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "stroke-color" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Border color"
                description="Add border color for your elements"
            />
            <ScrollArea>
                <div className="space-y-6 p-4">
                    <ColorPicker
                        value={value}
                        onChange={(value: string) => editor?.changeStrokeColor(value)}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}