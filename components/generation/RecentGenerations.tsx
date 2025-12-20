"use client";

import { useGenerationStore } from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import { GenerationItem } from "./GenerationItem";

export function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);

  if (generations.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 ">
      <h2 className="text-lg font-semibold text-profile-menu-text mb-4">
        Recent generations
      </h2>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {generations.map((generation, index) => (
            <GenerationItem
              key={generation.id}
              generation={generation}
              index={index}
              variant="default"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
