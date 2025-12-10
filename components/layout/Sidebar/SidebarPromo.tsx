import { PROMO_MESSAGE } from "@/lib/constants";

export function SidebarPromo() {
  return (
    <div className="p-4 border-t border-border">
      <div className="bg-gradient-to-br from-accent-purple to-accent-red rounded-lg p-4 text-sm">
        <p className="text-foreground">{PROMO_MESSAGE}</p>
      </div>
    </div>
  );
}

