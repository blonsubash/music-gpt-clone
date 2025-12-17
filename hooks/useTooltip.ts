import { useEffect, useRef } from "react";
import type { Props } from "tippy.js";

export function useTooltip() {
  const tippyRef = useRef<typeof import("tippy.js").default | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !tippyRef.current) {
      import("tippy.js").then((module) => {
        tippyRef.current = module.default;
      });
    }
  }, []);

  const tooltip = (selector: string | Element, options?: Partial<Props>) => {
    if (typeof window === "undefined" || !tippyRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tippyRef.current(selector as any, options);
  };

  return {
    tooltip,
  };
}
