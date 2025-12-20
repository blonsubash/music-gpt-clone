import { FlagIcon } from "@/app/assets/icons";
import { FOOTER_LINKS } from "@/lib/constants";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";

export function SidebarFooter() {
  return (
    <div className="p-4 ">
      <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-text-muted">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            {link.label}
          </a>
        ))}
        <div className="flex items-center gap-1 cursor-pointer">
          <Image src={FlagIcon} alt="Flag" width={16} height={16} />
          <span> EN</span>

          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
