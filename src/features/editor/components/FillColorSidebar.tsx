import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./ColorPicker";
import { FILL_COLOR } from "../contstants/constants";
import { useEffect, useState } from "react";

interface FillColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export default function FillColorSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FillColorSidebarProps) {
    const value = editor?.getActiveFillColor() || FILL_COLOR;
    
    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "fill" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Fill color"
                description="Add fill color for your elements"
            />
            <ScrollArea>
                <div className="space-y-6 p-4">
                    <ColorPicker
                        value={value}
                        onChange={(value: string) => editor?.changeFillColor(value)}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}