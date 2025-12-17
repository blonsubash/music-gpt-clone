import { Languages } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";

export function SidebarFooter() {
  return (
    <div className="p-4 ">
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-hover hover:text-foreground transition-colors mb-4 cursor-pointer">
        <Languages className="w-5 h-5" />
        <span>Language</span>
      </button>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-muted">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
