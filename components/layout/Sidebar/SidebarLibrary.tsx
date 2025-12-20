import { NavButton } from "@/components/ui/NavButton";
import { LIBRARY_ITEMS } from "@/lib/constants";

export function SidebarLibrary() {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h3 className="text-xs font-medium text-text-secondary  tracking-wider mb-3 ml-4">
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
