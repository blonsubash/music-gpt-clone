"use client";

import { useGenerationStore } from "@/lib/store";
import { CustomAnimate } from "@/components/ui/Animate";
import { AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import Image from "next/image";

export function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);

  if (generations.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Recent Generations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {generations.slice(0, 6).map((generation, index) => (
            <CustomAnimate
              key={generation.id}
              fadeIn={true}
              fadeOut={true}
              direction="up"
              duration={0.3}
              delay={index * 0.05}
              easing={[0.4, 0, 0.2, 1]}
              className="bg-card border border-border rounded-xl p-4 hover:border-text-tertiary transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-hover rounded-lg flex items-center justify-center relative overflow-hidden">
                  {generation.thumbnailUrl ? (
                    <Image
                      src={generation.thumbnailUrl}
                      alt={generation.prompt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Music className="w-12 h-12 text-text-tertiary" />
                  )}
                  {generation.status === "generating" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-sm font-medium">
                        {generation.progress}%
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {generation.prompt}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        generation.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : generation.status === "generating"
                          ? "bg-blue-500/10 text-blue-500"
                          : generation.status === "failed"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {generation.status}
                    </div>
                  </div>
                </div>
              </div>
            </CustomAnimate>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
