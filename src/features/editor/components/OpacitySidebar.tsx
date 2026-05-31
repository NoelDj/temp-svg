import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./ColorPicker";
import { FILL_COLOR, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../contstants/constants";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface OpacitySidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function OpacitySidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: OpacitySidebarProps) {
    const initialOpacityValue = editor?.getActiveOpacity() || 1
    const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects[0]])
    const [opacity, setOpacity] = useState(initialOpacityValue)

    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    useEffect(() => {
        if (selectedObject) {
            setOpacity(selectedObject.get("opacity") || 1)
        }
    }, [selectedObject])
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "opacity" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Change Opacity"
                description="Change opacity of selected objects"
            />
            <ScrollArea>
                <div className="space-y-6 p-4 border-b">
                    <div className="flex justify-between">
                        <Label className="text-sm">Opacity</Label>
                    </div>
                    <Slider
                        value={[opacity]}
                        onValueChange={(value) => {
                            const newValue = value[0]
                            setOpacity(newValue)
                            editor?.changeOpacity(newValue)
                        }}
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}