import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./ColorPicker";
import { FILL_COLOR, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../contstants/constants";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { json } from "stream/consumers";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function StrokeWidthSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeWidthSidebarProps) {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY
    const strokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR

    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "stroke-width" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Stroke Options"
                description="Modify stroke of your element"
            />
            <ScrollArea>
                <div className="space-y-6 p-4 border-b">
                    <div className="flex justify-between">
                        <Label className="text-sm">Stroke Width</Label>
                        <p>{widthValue}</p>
                    </div>
                    <Slider 
                        value={[widthValue]}
                        onValueChange={(values) => {
                            editor?.changeStrokeWidth(values[0])
                        }}
                        min={1}
                        max={20}
                    />
                </div>
                <div className="space-y-6 p-4 border-b">
                    <div className="flex justify-between">
                        <Label className="text-sm">Stroke Type</Label>
                    </div>
                    <Button
                        onClick={() => editor?.changeStrokeDashArray([])}
                        variant='secondary' 
                        className={cn(
                            "w-full h-16 justify-start text-left px-2 py-4",
                            JSON.stringify(typeValue) === '[]' && 'border border-primary'
                        )}
                    >
                        <div className={`w-full rounded-full border-4`} style={{borderColor: strokeColor}}/>
                    </Button>
                    <Button
                        onClick={() => editor?.changeStrokeDashArray([2,2])}
                        variant='secondary' 
                        className={cn(
                            "w-full h-16 justify-start text-left px-2 py-4",
                            JSON.stringify(typeValue) === '[2,2]' && 'border border-primary'
                        )}
                    >
                        <div className={`w-full rounded-full border-4 border-dashed`} style={{borderColor: strokeColor}}/>
                    </Button>
                    <Button
                        onClick={() => editor?.changeStrokeDashArray([5,5])}
                        variant='secondary' 
                        className={cn(
                            "w-full h-16 justify-start text-left px-2 py-4",
                            JSON.stringify(typeValue) === '[5,5]' && 'border border-primary'
                        )}
                    >
                        <div className={`w-full rounded-full border-4 border-dashed`} style={{borderColor: strokeColor}}/>
                    </Button>
                    
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}