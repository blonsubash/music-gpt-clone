import { Music } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="p-6 ">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent-purple to-accent-orange flex items-center justify-center">
          <Music size={20} color="white" />
        </div>
        <span className="text-xl font-semibold text-foreground">MusicGPT</span>
      </div>
    </div>
  );
}
