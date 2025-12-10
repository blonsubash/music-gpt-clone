"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PromptBox } from "@/components/prompt";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";

export default function Home() {
  const { activeNav, handleNavChange } = useActiveNavigation("home");
  const [promptValue, setPromptValue] = useState("");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />
      <main className="flex-1 ml-64 bg-background min-h-screen p-8">
        <Header />
        <PromptBox promptValue={promptValue} onPromptChange={setPromptValue} />
      </main>
    </div>
  );
}
