import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export default function SidebarItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) {
    return (
        <button
            //variant='ghost'
            onClick={onClick}
            className={cn(
            "flex flex-col rounded-none p-4 items-center gap-1",
            isActive && "bg-muted text-[#588500]"
            )}
        >
            <Icon className="size-5 stroke-1" />
            <span className="mt-0.5 text-xs">{label}</span>
        </button>
    );
};