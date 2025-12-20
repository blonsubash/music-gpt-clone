import { SearchIcon } from "@/app/assets/icons";

import Image from "next/image";

export function SidebarSearch() {
  return (
    <div className="p-4 mr-6">
      <div className="border rounded-[1.875rem] border-white/15 gap-2 flex items-center justify-center h-9.5 pl-3 pr-3 w-fit">
        <Image src={SearchIcon} alt="Search" width={20} height={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full text-sm text-white placeholder-text-white focus:outline-none focus:ring-0"
        />
        <span className="text-xs text-text-muted">⌘K</span>
      </div>
    </div>
  );
}
