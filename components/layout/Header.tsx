"use client";

import { useRef, useEffect } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { useGenerationStore } from "@/lib/store";

export function Header() {
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const generations = useGenerationStore((state) => state.generations);
  const isProfileMenuOpen = useGenerationStore(
    (state) => state.isProfileMenuOpen
  );
  const setIsProfileMenuOpen = useGenerationStore(
    (state) => state.setIsProfileMenuOpen
  );
  const generationCount = generations.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-profile-menu]")
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <div className="flex justify-end items-center gap-4 mb-8 relative">
      <button className="px-4 py-2 text-sm hover:text-text-tertiary transition-colors text-foreground">
        Sign in
      </button>
      <button className="px-4 py-2 text-sm bg-background-dark rounded-lg hover:bg-active transition-colors text-foreground">
        Get MusicGPT Free
      </button>

      <button
        ref={profileButtonRef}
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="relative p-0 w-12 h-12 rounded-full border-2 border-transparent bg-gradient-to-br from-accent-purple to-accent-orange hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
        aria-label="Profile menu"
      >
        <div className="w-10 h-10 rounded-full bg-background-dark flex items-center justify-center text-white font-semibold text-sm">
          S
        </div>
        {generationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
            <span className="text-white text-xs font-semibold">
              {generationCount}
            </span>
          </div>
        )}
      </button>

      <div data-profile-menu>
        <ProfileMenu
          isOpen={isProfileMenuOpen}
          onClose={() => setIsProfileMenuOpen(false)}
        />
      </div>
    </div>
  );
}
