import { ACTION_BUTTONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PromptActions() {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {ACTION_BUTTONS.map((action) => {
        const Icon = action.icon;
        const isPrimary = action.variant === "primary";

        return (
          <button
            key={action.id}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
              isPrimary
                ? "bg-gradient-to-r from-accent-yellow to-accent-orange hover:opacity-90"
                : "bg-hover hover:bg-active"
            )}
          >
            <Icon className={cn("w-5 h-5", action.iconColor)} />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}

