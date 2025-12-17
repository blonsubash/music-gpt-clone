"use client";

import { X } from "lucide-react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarLibrary } from "./SidebarLibrary";
import { SidebarPromo } from "./SidebarPromo";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  activeNav: string;
  onNavChange: (navId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  activeNav,
  onNavChange,
  isOpen = true,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          w-64 bg-sidebar fixed h-screen z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-foreground" />
        </button>

        <SidebarLogo />
        <SidebarSearch />
        <SidebarNavigation activeNav={activeNav} onNavChange={onNavChange} />
        <SidebarLibrary />
        <SidebarPromo />
        <SidebarFooter />
      </aside>
    </>
  );
}
