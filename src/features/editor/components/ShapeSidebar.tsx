import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShapeTool } from "./Shapetool";
import UseEditor from "../hooks/UseEditor";
import { Pentagon, Star } from "lucide-react";
import { PentagonIcon } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import svgImagesList from "../contstants/svgImageList";
import { Button } from "@/components/ui/button";

interface ShapeSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export default function ShapeSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ShapeSidebarProps) {
    
    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "shapes" || activeTool === "select" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Shapess"
                description="Add shapes"
            />
            <div className="p-4">
                <Tabs defaultValue="svgs">
                    <TabsList>
                        <TabsTrigger value="svgs">Svgs</TabsTrigger>
                        <TabsTrigger value="shapes">Shapes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="svgs">
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {
                                svgImagesList.map(({url, name, id}) => (
                                    <Button
                                        variant='ghost'
                                        onClick={() => editor?.addSVG(url)}
                                        className="relative w-[100px] h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border p-2"
                                        key={id}
                                    >
                                        <img
                                            width='100%'
                                            sizes=""
                                            alt="svg"
                                            src={url}
                                        />
                                    </Button>
                                ))
                            }
                            
                        </div>
                    </TabsContent>
                    <TabsContent value="shapes">
                        <div className="grid grid-cols-3 gap-4 p-4">
                            <ShapeTool
                                onClick={() => editor?.addCircle()}
                                icon={FaCircle}
                            />
                            <ShapeTool
                                onClick={() => editor?.addSoftRectangle()}
                                icon={FaSquare}
                            />
                            <ShapeTool
                                onClick={() => editor?.addRectangle()}
                                icon={FaSquareFull}
                            />
                            <ShapeTool
                                onClick={() => {editor?.addTriangle()}}
                                icon={IoTriangle}
                            />
                            <ShapeTool
                                onClick={() => {editor?.addInverseTriangle()}}
                                icon={IoTriangle}
                                iconClassName="rotate-180"
                            />
                            <ShapeTool
                                onClick={() => {editor?.addDiamond()}}
                                icon={FaDiamond}
                            />
                            <ShapeTool
                                onClick={() => {editor?.addPentagon()}}
                                icon={PentagonIcon}
                            />
                            <ShapeTool
                                onClick={() => {editor?.addStar()}}
                                icon={Star}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
                <ScrollArea>
                    
                </ScrollArea>

            </div>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}