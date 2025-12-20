import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export type NavigationItem = {
  id: string;
  label: string;
  icon: StaticImageData;
  href?: string;
};

export type LibraryItem = {
  id: string;
  label: string;
  icon: StaticImageData;
  href?: string;
};

export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type ActionButton = {
  id: string;
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
  iconColor?: string;
};
