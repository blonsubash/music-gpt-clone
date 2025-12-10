import {
  Home as HomeIcon,
  Sparkles,
  Globe,
  User,
  Heart,
  Plus,
  Music,
  Radio,
  MessageSquare,
  FileEdit,
  Dice1,
} from "lucide-react";
import { NavigationItem, LibraryItem, FooterLink, ActionButton } from "./types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    id: "create",
    label: "Create",
    icon: Sparkles,
  },
  {
    id: "explore",
    label: "Explore",
    icon: Globe,
  },
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "liked",
    label: "Liked",
    icon: Heart,
  },
  {
    id: "new-playlist",
    label: "New Playlist",
    icon: Plus,
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "affiliate", label: "Affiliate", href: "#" },
  { id: "api", label: "API", href: "#" },
  { id: "about", label: "About", href: "#" },
  { id: "terms", label: "Terms", href: "#" },
  { id: "privacy", label: "Privacy", href: "#" },
];

export const ACTION_BUTTONS: ActionButton[] = [
  {
    id: "create-song",
    label: "Create song",
    icon: Music,
    variant: "primary",
  },
  {
    id: "create-sound",
    label: "Create Sound",
    icon: Radio,
    iconColor: "text-purple-400",
  },
  {
    id: "speak-text",
    label: "Speak text",
    icon: MessageSquare,
    iconColor: "text-blue-400",
  },
  {
    id: "change-file",
    label: "Change file",
    icon: FileEdit,
    iconColor: "text-green-400",
  },
  {
    id: "random",
    label: "Random",
    icon: Dice1,
    iconColor: "text-gray-400",
  },
];

export const PROMO_MESSAGE =
  "Model v6 Pro is here! Pushing boundaries to the world's best AI music model";

