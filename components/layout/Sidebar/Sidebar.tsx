"use client";

import { SidebarLogo } from "./SidebarLogo";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarLibrary } from "./SidebarLibrary";
import { SidebarPromo } from "./SidebarPromo";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  activeNav: string;
  onNavChange: (navId: string) => void;
}

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar flex flex-col h-screen fixed left-0 top-0">
      <SidebarLogo />
      <SidebarSearch />
      <SidebarNavigation activeNav={activeNav} onNavChange={onNavChange} />
      <SidebarLibrary />
      <SidebarPromo />
      <SidebarFooter />
    </aside>
  );
}

