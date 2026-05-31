import { cn } from "@/lib/utils";
import { ActiveTool, ColorObject, DetectedColors, Editor, ObjectColors } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./ColorPicker";
import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { standardColorPalettes } from "../contstants/constants";
import { Button } from "@/components/ui/button";

interface SvgFillSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function SvgFillSidebar({
    editor,
    activeTool,
    onChangeActiveTool,
}: SvgFillSidebarProps) {
    const initialColors = editor?.getActiveSvgColors() || [];

    const [colors, setColors] = useState(initialColors)
    const [activeColorIndex, setActiveColorIndex] = useState(0)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    // const selectedObject = useMemo(
    //     () => editor?.selectedObjects[0],
    //     [editor?.selectedObjects[0]]
    // );

    const selectedObject = editor?.selectedObjects?.[0]


    useEffect(() => {

        if (selectedObject) {
            const svgColors = editor?.getActiveSvgColors() || []
            setColors(svgColors)
            //setActiveColorIndex(0)
        }
    }, [selectedObject, editor])

    useEffect(() => {
        setActiveColorIndex(0)
    }, [selectedObject])

    if (colors.length === 0 || !selectedObject) {
        return null;
    }

    const onClose = () => {
        onChangeActiveTool("select");
    }

    function handleColorChange(newColor: string) {

        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            onColorChange(newColor)
        }, 500)
    }

    function onColorChange(newColor: string) {
        
        const updatedColors = colors.map((color, index) => {
            if (index === activeColorIndex) {
                const newColorObject = {
                    ...color
                }
                    
                if (Object.hasOwn(color, 'activeFillColor')) {
                    newColorObject.activeFillColor = newColor
                } else if (Object.hasOwn(color, 'activeStrokeColor')) {
                    newColorObject.activeStrokeColor = newColor
                }
                
                return newColorObject
            }

            return color
        })

        setColors(updatedColors)

        let propertyToUpdate = ''
        const activeColor = colors[activeColorIndex]
        let oldColor = ''

        if (Object.hasOwn(activeColor, 'activeFillColor')) {
            propertyToUpdate = 'Fill'
            oldColor = activeColor.originalFillColor
        } else if (Object.hasOwn(activeColor, 'activeStrokeColor')) {
            propertyToUpdate = 'Stroke'
            oldColor = activeColor.originalStrokeColor
        }

        editor?.replaceActiveSvgColors(oldColor, newColor, propertyToUpdate as 'Fill' | 'Stroke')
    }

    function applyColorPalette(palette: string[]) {
        
        const appliedColors = editor?.applyColorpaletteToSvg(palette)

        if (!appliedColors) return

        setColors(appliedColors)
    }


    return (
        <aside
            className={cn(
                "relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "svg" ? "visible" : "hidden"
            )}
        >
            <ToolSidebarHeader
                title="Change Svg Fill"
                description="Change fill of selected svgs"
            />

            <ScrollArea className="min-h">
                <div className="space-y-6 p-4 border-b">
                    <div className="flex flex-col">
                        <Label className="text-sm mb-2">Colors detected in SVG</Label>
                        <ScrollArea className="max-h-45 overflow-y-auto pb-2 border-b border-slate-200">
                            <div className="flex flex-wrap gap-3 p-4 px-2">
                                {
                                    colors.map((color, i) => {
                                        let colorObject = {
                                            id: ''
                                        }

                                        if ('activeFillColor' in color) {
                                            colorObject.id = 'fill' + color.originalFillColor + Math.floor(Math.random() * 3000)
                                        } else if ('activeStrokeColor' in color) {
                                            colorObject.id = 'stroke' + color.originalStrokeColor + Math.floor(Math.random() * 3000)
                                        }

                                        return (
                                            <ColorButton 
                                                key={colorObject.id}
                                                color={color}
                                                isActive={activeColorIndex === i}
                                                onClick={() => setActiveColorIndex(i) }                                                
                                            />
                                        )
                                    })
                                }
                            </div>
                        </ScrollArea>

                        <div className="pt-4">
                            <Tabs defaultValue="color-picker">
                                <TabsList>
                                    <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
                                    <TabsTrigger value="color-palette">Color palettes</TabsTrigger>
                                </TabsList>
                                <TabsContent value="color-picker">
                                    <ColorPicker
                                        value={colors[activeColorIndex]?.activeFillColor || colors[activeColorIndex]?.activeStrokeColor}
                                        onChange={onColorChange}
                                    />
                                </TabsContent>
                                <TabsContent value="color-palette">
                                    <ScrollArea className="h-[400px] pr-4">
                                        <div className="flex flex-col gap-4">
                                            {
                                                standardColorPalettes.map(({palette, name}) => (
                                                    <div key={name} className="shadow-sm border rounded-2xl p-2">
                                                        <div className="mb-2 flex justify-between items-center">
                                                            <p>{name}</p>
                                                            <Button 
                                                                onClick={() => applyColorPalette(palette)}
                                                                variant="secondary">Apply</Button>
                                                        </div>
                                                        <div className="flex rounded-2xl overflow-hidden border h-5 justify-evenly">
                                                            {
                                                                palette.map(color => (
                                                                    <button
                                                                        key={color}
                                                                        onClick={() => onColorChange(color)}
                                                                        className="h-full flex-1 cursor-pointer"
                                                                        style={{backgroundColor: color}}
                                                                    />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                            
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <Button onClick={() => {
                        setColors(editor?.resetSvgColors())
                    }}>Reset Colors</Button>
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
}

interface ColorButtonProps {
    color: any
    onClick: () => void;
    isActive: boolean
}

function ColorButton({
    color,
    onClick,
    isActive 
}: ColorButtonProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            //title={color.originalColor}
            className={cn(
                "w-8 h-8 rounded-full border transition-all",
                isActive ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:scale-105"
            )}

            style={{
                backgroundColor: color.activeFillColor || color.activeStrokeColor,
            }}

        />
    );
}