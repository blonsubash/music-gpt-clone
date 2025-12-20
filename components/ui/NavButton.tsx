import { StaticImageData } from "next/image";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  icon: StaticImageData;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavButton({
  icon,
  label,
  isActive = false,
  onClick,
  className,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        " flex items-center gap-2 px-4 py-1 rounded-[1.875rem] transition-colors cursor-pointer  w-fit h-9.25 ",
        isActive
          ? "bg-active text-white/10"
          : "text-text-secondary hover:bg-hover hover:text-white/10",
        className
      )}
    >
      <Image src={icon} alt={label} height={16} width={16} />
      <span className="text-sm font-medium text-white">{label}</span>
    </button>
  );
}
