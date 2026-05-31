import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./ColorPicker";
import { FILL_COLOR, fonts, linuxSafeFonts, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../contstants/constants";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function FontSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FontSidebarProps) {
    const fontFamilyValue = editor?.getActiveFontFamily()

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "font" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Font"
                description="Change font"
            />
            <ScrollArea className="min-h-0">
                <div className="p-4 space-y-1 border-b">
                    {linuxSafeFonts.map((font) => (
                        <Button
                            key={font}
                            variant="secondary"
                            size="lg"
                            className={cn(
                                "w-full h-16 justify-start text-left",
                                fontFamilyValue === font && "border-2 border-blue-500",
                            )}
                            style={{
                                fontFamily: font,
                                fontSize: "16px",
                                padding: "8px 16px"
                            }}
                            onClick={() => editor?.changeFontFamily(font)}
                        >{font}</Button>
                    ))}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}