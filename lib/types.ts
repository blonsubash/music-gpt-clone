import { LucideIcon } from "lucide-react";

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
};

export type LibraryItem = {
  id: string;
  label: string;
  icon: LucideIcon;
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

