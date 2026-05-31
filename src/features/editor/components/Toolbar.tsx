"use client"

import { ActiveTool, Editor } from "../types";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Copy, FilterIcon, TrashIcon, UngroupIcon } from "lucide-react";
import { TbColorFilter } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { isObjectSvg, isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa6";
import { FONT_SIZE, FONT_WEIGHT } from "../contstants/constants";
import { useEffect, useState } from "react";
import { IoColorPalette } from "react-icons/io5";
import FontSizeInput from "./FontSizeInput";

type ToolbarProps = {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void
}

type ToolbarItem = {
    label: string
    cb: () => void
    type: 'group' | 'image' | 'text' | 'all'
    Icon: React.ReactElement
}

export default function Toolbar({
    editor,
    activeTool,
    onChangeActiveTool,
}: ToolbarProps) {
    // const selectedObject = editor?.canvas.getActiveObject()

    // const getProperty = (property: any) => {
    //     if (!selectedObject) return

    //     return selectedObject.get(property)
    // }

    //const fillColor = getProperty('fill')
    const initialFillColor = editor?.getActiveFillColor()
    const initialStrokeColor = editor?.getActiveStrokeColor()
    const initialFontFamily = editor?.getActiveFontFamily()
    const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT
    const initialFontStyle = editor?.getActiveFontStyle()
    const initalLinethrough = editor?.getActiveFontLinethrough()
    const intialUnderline = editor?.getActiveFontUnderline()
    const intialTextAlign = editor?.getActiveTextAlign()
    const intialFontSize = editor?.getActiveFontSize() || FONT_SIZE

    const [properties, setProperties] = useState({
        fillColor: initialFillColor,
        strokeColor: initialStrokeColor,
        fontFamily: initialFontFamily,
        fontWeight: initialFontWeight,
        fontStyle: initialFontStyle,
        linethrough: initalLinethrough,
        underline: intialUnderline,
        textAlign: intialTextAlign,
        fontSize: intialFontSize
    })

    let selectedObjectType = editor?.selectedObjects[0]?.type || 'all'
    
    if (selectedObjectType === "i-text" || selectedObjectType === "textbox"){
        selectedObjectType = 'text'
    }
    
    const isText = isTextType(selectedObjectType)
    const selectedObject = editor?.selectedObjects[0]
    const isSvg = isObjectSvg(selectedObjectType) //group, image, text, all
    const isImage = selectedObjectType === 'image'

    function toggleBold () {
        if (!selectedObject) return

        const newValue = properties.fontWeight > 500 ? 500 : 700
        editor?.changeFontWeight(newValue)
        setProperties((current) => ({
            ...current,
            fontWeight: newValue
        }))
    }

    function toggleItalic () {
        if (!selectedObject) return

        const isItalic = properties.fontStyle === 'italic'
        const newValue = isItalic ? 'normal' : 'italic'
        editor?.changeFontStyle(newValue)
        setProperties((current) => ({
            ...current,
            fontStyle: newValue
        }))
    }

    function toggleLinethrough () {
        if (!selectedObject) return

        const newValue = properties.linethrough ? false : true
        editor?.changeLinethrough(newValue)
        setProperties((current) => ({
            ...current,
            linethrough: newValue
        }))
    }

    function toggleUnderline () {
        if (!selectedObject) return

        const newValue = properties.underline ? false : true
        editor?.changeUnderline(newValue)
        setProperties((current) => ({
            ...current,
            underline: newValue
        }))
    }

    function changeTextAlign (value: 'left' | 'center' | 'right') {
        if (!selectedObject) return

        editor?.changeTextAlign(value)
        setProperties((current) => ({
            ...current,
            textAlign: value
        }))
    }

    function changeFontSize (value: number) {
        if (!selectedObject) return

        editor?.changeFontSize(value)
        setProperties((current) => ({
            ...current,
            fontSize: value
        }))
    }

    if (editor?.selectedObjects.length === 0) {
        return <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[29] p-2 gap-x-2"></div>
    }
    
    // const [properties, setProperties] = useState({
    //     fillColor,
    // })


    const toolbarItems = [
        {
            type: "image",
            label: "Filters",
            cb: () => onChangeActiveTool("filter"),
            Icon: <TbColorFilter className="size-4" />
        },
        // Text
        {
            type: "text",
            label: "Font Family",
            cb: () => onChangeActiveTool("font"),
            Icon: (
                <>
                    <div className="max-w-[200px] truncate">
                        {properties.fontFamily}
                    </div>
                    <ChevronDown className="size-4 ml-2 shrink-0" />
                </>
            ),
            buttonStyles: "w-auto px-2 text-sm"
        },
        {
            type: "text",
            label: "Bold",
            cb: toggleBold,
            Icon: <FaBold />
        },
        {
            type: "text",
            label: "Italic",
            cb: toggleItalic,
            Icon: <FaItalic />
        },
        {
            type: "text",
            label: "Linethrough",
            cb: toggleLinethrough,
            Icon: <FaStrikethrough />
        },
        {
            type: "text",
            label: "Underline",
            cb: toggleUnderline,
            Icon: <FaUnderline />
        },
        {
            type: "text",
            label: "Align left",
            cb: () => changeTextAlign("left"),
            Icon: <AlignLeft />
        },
        {
            type: "text",
            label: "Align center",
            cb: () => changeTextAlign("center"),
            Icon: <AlignCenter />
        },
        {
            type: "text",
            label: "Align right",
            cb: () => changeTextAlign("right"),
            Icon: <AlignRight />
        },

        // All
        {
            type: "all",
            label: "Delete",
            cb: () => editor?.deleteActiveObjects(),
            Icon: <TrashIcon />
        },
        {
            type: "all",
            label: "Bring up",
            cb: () => editor?.bringForward(),
            Icon: <ArrowUp />
        },
        {
            type: "all",
            label: "Bring down",
            cb: () => editor?.bringBackwards(),
            Icon: <ArrowDown />
        },
        {
            type: "all",
            label: "Opacity",
            cb: () => onChangeActiveTool("opacity"),
            Icon: <RxTransparencyGrid />
        },
        {
            type: "all",
            label: "Duplicate",
            cb: () => {
                editor?.onCopy();
                editor?.onPaste();
            },
            Icon: <Copy className="size-4" />
        },
        //SVG (Group)
        {
            type: "group",
            label: "Color svg",
            cb: () => onChangeActiveTool("svg"),
            Icon: <IoColorPalette className="text-primary" />
        },
        // {
        //     type: "group",
        //     label: "Ungroup",
        //     cb: () => editor?.ungroup(),
        //     Icon: <UngroupIcon  />
        // }
        
    ]

    return (
        <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[29] p-2 gap-x-2">
            <div className="flex items-center h-full justify-center gap-4">
                {
                    !isSvg &&
                    <Hint label="Color" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeActiveTool("fill")}
                            size="icon"
                            variant="ghost"
                            className={cn(activeTool === "fill" && "bg-gray-100", "w-[30px] h-[30px]")}
                        >
                            <div className="rounded-sm border w-full h-full" style={{ backgroundColor: properties.fillColor }} />
                        </Button>
                    </Hint>
                }
                {
                    !isText && (
                        <>
                            <Hint label="Border Color" side="bottom" sideOffset={5}>
                                <Button
                                    onClick={() => onChangeActiveTool("stroke-color")}
                                    size="icon"
                                    variant="ghost"
                                    className={cn(activeTool === "stroke-color" && "bg-gray-100", "w-[30px] h-[30px]")}
                                >
                                    <div className="rounded-sm w-full h-full bg-white border border-2" style={{ borderColor: properties.strokeColor }} />
                                </Button>
                            </Hint>
                            <Hint label="Stroke Width" side="bottom" sideOffset={5}>
                                <Button
                                    onClick={() => onChangeActiveTool("stroke-width")}
                                    size="icon"
                                    variant="ghost"
                                    className={cn(activeTool === "stroke-width" && "bg-gray-100", "w-[30px] h-[30px]")}
                                >
                                    <BsBorderWidth />
                                </Button>
                            </Hint>
                        </>
                    )
                }
                {
                    isText && (
                        <>
                            <FontSizeInput 
                                onChange={(value) => changeFontSize(value)}
                                value={properties.fontSize}
                            />
                        </>
                    )
                }
                    
                

                {toolbarItems.filter(({type}) => type === 'all' || selectedObjectType === type).map(({
                    label,
                    cb,
                    Icon,
                    buttonStyles
                }) => ( 
                    <ToolbarItem
                        key={label}
                        label={label}
                        cb={cb}
                        Icon={Icon}
                        buttonStyles={buttonStyles}
                    />
                ))}
                
            </div>
        </div>
    )
}


type ToolbarItemProps = {
    label: string
    cb: () => void
    Icon: React.ReactElement
    buttonStyles?: string
}

function ToolbarItem ({
    label,
    cb,
    Icon,
    buttonStyles
}: ToolbarItemProps) {
    
    return (
        <Hint label={label} side="bottom" sideOffset={5}>
            <Button
                onClick={() => {
                    cb()
                }}
                size="icon"
                variant="ghost"
                className={buttonStyles}
            >
                {Icon}
            </Button>
        </Hint>
    )
}