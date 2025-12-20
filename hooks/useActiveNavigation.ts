import { useState, useCallback } from "react";

export function useActiveNavigation(initialNav: string = "create") {
  const [activeNav, setActiveNav] = useState(initialNav);

  const handleNavChange = useCallback((navId: string) => {
    setActiveNav(navId);
  }, []);

  return {
    activeNav,
    setActiveNav,
    handleNavChange,
  };
}
