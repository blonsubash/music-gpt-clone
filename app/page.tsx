"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PromptBox } from "@/components/prompt";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { RecentGenerations } from "@/components/generation";
import { FloatingMusicPlayer } from "@/components/player";

export default function Home() {
  const { activeNav, handleNavChange } = useActiveNavigation("home");
  const [promptValue, setPromptValue] = useState("");

  return (
    <div className=" min-h-screen flex    bg-background text-foreground">
      <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />
      <main className="flex-1 items-center justify-center  bg-background min-h-screen  p-8 pb-28">
        <Header />
        <PromptBox promptValue={promptValue} onPromptChange={setPromptValue} />
        <RecentGenerations />
      </main>
      <FloatingMusicPlayer />
    </div>
  );
}
