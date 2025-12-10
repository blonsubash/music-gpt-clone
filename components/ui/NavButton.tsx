import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavButton({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  className,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-active text-foreground"
          : "text-text-secondary hover:bg-hover hover:text-foreground",
        className
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

