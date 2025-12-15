import { NavButton } from "@/components/ui/NavButton";
import { NAVIGATION_ITEMS } from "@/lib/constants";

interface SidebarNavigationProps {
  activeNav: string;
  onNavChange: (navId: string) => void;
}

export function SidebarNavigation({
  activeNav,
  onNavChange,
}: SidebarNavigationProps) {
  return (
    <nav className="p-4 ">
      <div className="space-y-1">
        {NAVIGATION_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeNav === item.id}
            onClick={() => onNavChange(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
