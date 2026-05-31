import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CheckIcon, CrownIcon, XIcon } from "lucide-react";
import { MagicWandIcon } from "@phosphor-icons/react";

interface BrandSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function BrandSidebar ({
    editor,
    activeTool,
    onChangeActiveTool,
}: BrandSidebarProps) {

    const [currentPlan, setCurrentPlan] = useState<'Monthly' | 'Yearly'>("Yearly")

    const features = [
        "Define Color palettes",
        "100+ Premium Icons",
        "Define Fonts",
        "resize",
        "save more than 1 projects",
        "remove bg",
        "gen ai",
        "export",
        "size",
        "export to 2k,4k, etc",
        "compress",
        "limit file size",
        "Remove background from image",
    ]

    
    const onClose = () => {
        onChangeActiveTool("select")
    }
    
    return (
        <aside className={cn(
            "relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "brand" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader 
                title="Brand"
                description="Apply your configured styles"
            />
            <ScrollArea>
                <div className="space-y-6 p-4">
                    
                </div>
            </ScrollArea>

            

            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}


//graduation card designs
//simple birthday cards design
//birthday card easy design
//greeting card designs
//digital invitation cards









// <Button onClick={() => setIsopen(true)}>Subscribe</Button>

// {
//                         isOpen &&
//                             <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-100 flex items-center justify-center">
//                                 <div className="bg-white w-[900px] relative flex rounded-2xl">
//                                     <div className="flex-1 p-8 flex flex-col border-r">
//                                         <div className="flex gap-2 items-center mb-2">
//                                             <CrownIcon size={20} color="#e6aa07"/>
//                                             <h4 className="font-medium">Upgrade to get up to 100 Brand </h4>
//                                         </div>
//                                         <h3 className="text-4xl font-bold mb-4">Try SVGColor Pro</h3>

//                                         <div className="mb-3">
//                                             {features.map(feature => (
//                                                 <div key={feature} className="flex gap-x-4">
//                                                     <CheckIcon size={14} className="self-center"/>
//                                                     <p>{feature}</p>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                         <div className="mb-3 flex gap-2">
//                                             <button onClick={() => setCurrentPlan("Monthly")} className={cn("border rounded-xl flex-1 p-3 text-left", currentPlan === 'Monthly' && 'ring-1 ring-primary bg-primary/3')}>
//                                                 <div className="flex items-center gap-1">
//                                                     <MagicWandIcon />
//                                                     <p className="text-2xl">Monthly plan</p>
//                                                 </div>
//                                                 <p className="font-medium">$4/monthly</p>
//                                                 <p className="text-sm">Mostly used</p>
//                                             </button>
//                                             <button onClick={() => setCurrentPlan("Yearly")} className={cn("border rounded-xl flex-1 p-3 text-left", currentPlan === 'Yearly' && 'ring-1 ring-primary bg-primary/3')}>
//                                                 <div className="flex items-center gap-1">
//                                                     <MagicWandIcon />
//                                                     <p className="text-2xl">Monthly plan</p>
//                                                 </div>
//                                                 <p className="font-medium">$4/monthly</p>
//                                                 <p className="text-sm">Mostly used</p>
//                                             </button>
//                                         </div>

//                                         <Button className="w-full mt-auto py-6 text-lg">Unlock Pro Features</Button>

//                                     </div>
//                                     <div className="flex">
//                                         <img className="self-end" src="https://content-management-files.canva.com/487fca6b-a15f-4ff5-bcba-8ef1a56bebba/bk-backdrop-en.png" width="400px" alt="" />
//                                     </div>

//                                     <Button variant="secondary" className="absolute top-0 -right-[60px] rounded-2xl" onClick={() => setIsopen(false)}><XIcon /></Button>
//                                 </div>
//                             </div>
//                     }