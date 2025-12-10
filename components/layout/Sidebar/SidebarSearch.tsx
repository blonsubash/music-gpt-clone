import { Search } from "lucide-react";

export function SidebarSearch() {
  return (
    <div className="p-4 border-b border-border">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-background rounded-lg pl-10 pr-12 py-2 text-sm text-foreground placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-text-secondary"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-text-muted">
          ⌘K
        </span>
      </div>
    </div>
  );
}

