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
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

interface SettingsSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function SettingsSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: SettingsSidebarProps) {
    
    const workspace = editor?.getWorkspace()

    const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace])
    const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace])
    const initialBackground = useMemo(() => workspace?.fill ?? "#ffffff", [workspace])

    const [width, setWidth] = useState(initialWidth)
    const [height, setHeight] = useState(initialHeight)
    const [background, setBackground] = useState(initialBackground)

    useEffect(() => {
        setWidth(initialWidth);
        setHeight(initialHeight);
        setBackground(initialBackground);
    }, 
    [
        initialWidth,
        initialHeight,
        initialBackground
    ])

    const changeWidth = (value: string) => setWidth(value);
    const changeHeight = (value: string) => setHeight(value);
    const changeBackground = (value: string) => {
        setBackground(value)
        editor?.changeBackground(value);
    }
    

    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        editor?.changeSize({
            width: parseInt(width, 10),
            height: parseInt(height, 10),
        })
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "settings" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Settings"
                description="Modify canvas"
            />
            <ScrollArea className="min-h-0">
                <form className="space-y-4 p-4" onSubmit={onSubmit}>
                    <div>
                        <p>Aspect ratio</p>
                    </div>
                    <div className="space-y-2">
                        <Label>
                        Height
                        </Label>
                        <Input
                        placeholder="Height"
                        value={height}
                        type="number"
                        onChange={(e) => changeHeight(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                        Width
                        </Label>
                        <Input
                        placeholder="Width"
                        value={width}
                        type="number"
                        onChange={(e) => changeWidth(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Resize
                    </Button>
                </form>
                <div className="p-4">
                    <ColorPicker
                        value={background as string}
                        onChange={changeBackground}
                    />
                    <div className="mt-10">
                        <Button
                            onClick={() => {
                                changeBackground('#FFF')
                            }}
                        >Reset</Button>
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}