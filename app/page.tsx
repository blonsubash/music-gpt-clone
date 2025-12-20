"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PromptBox } from "@/components/prompt";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { RecentGenerations } from "@/components/generation";
import { FloatingMusicPlayer } from "@/components/player";

export default function Home() {
  const { activeNav, handleNavChange } = useActiveNavigation("create");
  const [promptValue, setPromptValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-sidebar hover:bg-white/10 transition-colors md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={24} className="text-foreground" />
      </button>

      <main className="flex-1 items-center justify-center md:ml-50 bg-background min-h-screen p-8 pb-28 w-full mt-50 ">
        <Header />
        <PromptBox promptValue={promptValue} onPromptChange={setPromptValue} />
        <RecentGenerations />
      </main>
      <FloatingMusicPlayer />
    </div>
  );
}
