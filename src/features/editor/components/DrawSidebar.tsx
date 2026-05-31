import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { FILL_COLOR, fonts, imageFilters, linuxSafeFonts, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../contstants/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "./ColorPicker";

interface DrawSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function DrawSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: DrawSidebarProps) {
    const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH

    const onClose = () => {
        editor?.disableDrawingMode()
        onChangeActiveTool("select")
    }

    const onColorChange = (value: string) => {
        editor?.changeStrokeColor(value);
    }

    const onWidthChange = (value: number) => {
        editor?.changeStrokeWidth(value);
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "draw" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Draw mode"
                description="Modify brush"
            />
            <ScrollArea className="min-h-0">
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">
                        Brush width
                    </Label>
                    <Slider
                        value={[widthValue]}
                        onValueChange={(values) => onWidthChange(values[0])}
                    />
                </div>
                <div className="p-4 space-y-6">
                    <ColorPicker
                        value={colorValue}
                        onChange={onColorChange}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}