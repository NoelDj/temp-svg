"use client"

import React from 'react'

import { 
    LayoutTemplate,
    ImageIcon,
    Pencil,
    Presentation,
    Settings,
    Shapes,
    Sparkles,
    Type,
    BanknoteArrowUp,
    UploadIcon,
} from "lucide-react";
import SidebarItem from './SidebarItem';
import { ActiveTool } from '../types';

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: any) => void;
};

export default function Sidebar({
    activeTool,
    onChangeActiveTool
}: SidebarProps) {
    return (
        <aside className="flex flex-col w-23 border-r min-h-0">
            <ul className="flex flex-col flex-1">
                <SidebarItem
                    icon={LayoutTemplate}
                    label="Design"
                    isActive={activeTool === "templates"}
                    onClick={() => onChangeActiveTool("templates")}
                />
                <SidebarItem
                    icon={ImageIcon}
                    label="Image"
                    isActive={activeTool === "images"}
                    onClick={() => onChangeActiveTool("images")}
                />
                <SidebarItem
                    icon={UploadIcon}
                    label="Upload"
                    isActive={activeTool === "upload"}
                    onClick={() => onChangeActiveTool("upload")}
                />
                <SidebarItem
                    icon={Type}
                    label="Text"
                    isActive={activeTool === "text"}
                    onClick={() => onChangeActiveTool("text")}
                />
                <SidebarItem
                    icon={Shapes}
                    label="Shapes"
                    isActive={activeTool === "shapes"}
                    onClick={() => onChangeActiveTool("shapes")}
                />
                <SidebarItem
                    icon={Pencil}
                    label="Draw"
                    isActive={activeTool === "draw"}
                    onClick={() => onChangeActiveTool("draw")}
                />
                <SidebarItem
                    icon={Sparkles}
                    label="AI"
                    isActive={activeTool === "ai"}
                    onClick={() => onChangeActiveTool("ai")}
                />
                <SidebarItem
                    icon={Settings}
                    label="Settings"
                    isActive={activeTool === "settings"}
                    onClick={() => onChangeActiveTool("settings")}
                />
                <SidebarItem
                    icon={BanknoteArrowUp}
                    label="Brand"
                    isActive={activeTool === "brand"}
                    onClick={() => onChangeActiveTool("brand")}
                />
            </ul>
        </aside>
    )
}
