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
    if (typeof document === "undefined") return;

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
    <div className="absolute top-4 right-4 gap-4 ">
      <button
        ref={profileButtonRef}
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="relative p-0 w-12 h-12 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
        style={{
          background:
            "linear-gradient(312.58deg, rgba(200, 0, 255, 0.05) 17.25%, rgba(255, 44, 155, 0.05) 37.17%, rgba(255, 123, 0, 0.05) 62.95%, rgba(255, 133, 4, 0.05) 75.03%, rgba(255, 211, 99, 0.05) 82.54%)",
          border: "2px solid transparent",
          backgroundClip: "padding-box",
          position: "relative",
          cursor: "pointer",
        }}
        aria-label="Profile menu"
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(314.53deg, #C800FF 17.23%, #FF2C9B 38.51%, #FF7B00 66.07%, #FF8504 78.98%, #FFD363 87%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "2px",
            cursor: "pointer",
          }}
        />

        <div className=" rounded-full  flex items-center justify-center text-white font-normal text-xl relative z-10">
          J
        </div>
        {generationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-notification-badge rounded-full flex items-center justify-center border-2 border-background z-20">
            <span className="text-black text-[0.625rem] font-semibold">
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
