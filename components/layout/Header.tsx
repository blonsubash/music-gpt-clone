"use client";

import { useState, useRef, useEffect } from "react";
import { ProfileMenu } from "./ProfileMenu";

export function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

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

      {/* Profile Icon */}
      <button
        ref={profileButtonRef}
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="relative p-0 w-10 h-10 rounded-full border-2 border-transparent bg-gradient-to-br from-accent-purple to-accent-orange hover:opacity-90 transition-opacity flex items-center justify-center"
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 rounded-full bg-background-dark flex items-center justify-center text-white font-semibold text-sm">
          J
        </div>
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
          <span className="text-white text-xs font-semibold">2</span>
        </div>
      </button>

      {/* Profile Menu */}
      <div data-profile-menu>
        <ProfileMenu
          isOpen={isProfileMenuOpen}
          onClose={() => setIsProfileMenuOpen(false)}
        />
      </div>
    </div>
  );
}
