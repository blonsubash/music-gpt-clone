import { NavButton } from "@/components/ui/NavButton";
import { LIBRARY_ITEMS } from "@/lib/constants";

export function SidebarLibrary() {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Library
          </h3>
          <div className="space-y-1">
            {LIBRARY_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                className="text-text-secondary"
              />
            ))}
          </div>
    </div>
  );
}

