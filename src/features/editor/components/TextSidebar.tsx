import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function TextSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: TextSidebarProps) {
    
    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "text" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Text"
                description="Add text"
            />
            <ScrollArea>
                <div className="space-y-6 p-4 border-b">
                    <Button 
                        className="w-full"
                        onClick={() => editor?.addText("sakdja")}
                    >
                        Add text
                    </Button>
                    <Button 
                        className="w-full"
                        onClick={() => editor?.addText("sakdja", {
                            fontSize: 230,
                            fontWeight: 700
                        })}
                    >
                        Add heading
                    </Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}