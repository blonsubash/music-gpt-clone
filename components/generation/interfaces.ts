import { Generation } from "@/lib/store";
import { StaticImageData } from "next/image";

type GenerationItemVariant = "default" | "compact";

export interface GenerationItemProps {
  generation: Generation;
  index: number;
  variant?: GenerationItemVariant;
  onClose?: () => void;
}

export interface ActionButtonProps {
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
  className: string;
  icon?: StaticImageData;
  iconSize?: { width: number; height: number };
  iconClassName?: string;
}

export interface MobileActionsProps {
  variant: GenerationItemVariant;
}

export interface DesktopActionsProps {
  variant: GenerationItemVariant;
}
