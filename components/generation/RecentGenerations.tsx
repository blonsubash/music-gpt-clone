"use client";

import { useGenerationStore } from "@/lib/store";
import { CustomAnimate } from "@/components/ui/Animate";
import { AnimatePresence } from "framer-motion";
import { Play, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { getThumbnailWithFallback } from "@/lib/imageUtils";

export function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);
  const setCurrentGeneration = useGenerationStore(
    (state) => state.setCurrentGeneration
  );
  const setIsPlaying = useGenerationStore((state) => state.setIsPlaying);

  if (generations.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Recent generations
      </h2>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {generations.slice(0, 6).map((generation, index) => {
            const isGenerating = generation.status === "generating";
            const isFailed = generation.status === "failed";
            return (
              <CustomAnimate
                key={generation.id}
                fadeIn={true}
                fadeOut={true}
                direction="up"
                duration={0.3}
                delay={index * 0.05}
                easing={[0.4, 0, 0.2, 1]}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
                  isGenerating || isFailed
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-white/5"
                }`}
                onClick={() => {
                  if (
                    generation.status === "completed" &&
                    generation.audioUrl
                  ) {
                    console.log("Setting current generation and playing...");
                    setCurrentGeneration(generation);
                    setIsPlaying(true);
                  } else {
                    console.log(
                      "Condition not met - status or audioUrl missing"
                    );
                  }
                }}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-hover">
                    <Image
                      src={getThumbnailWithFallback(
                        generation.thumbnailUrl,
                        index
                      )}
                      alt={generation.prompt}
                      fill
                      className={`object-cover transition-all duration-700 ease-out ${
                        isGenerating || isFailed
                          ? "opacity-30 scale-105 blur-sm"
                          : "opacity-100 scale-100 blur-0"
                      }`}
                    />

                    {!isGenerating && !isFailed && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-out">
                          <Play className="w-5 h-5 text-black fill-black" />
                        </div>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/50 overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-blue-400/40 via-cyan-400/40 to-green-400/80 transition-all duration-500 ease-out"
                          style={{
                            height: `${generation.progress}%`,
                          }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-xs font-semibold drop-shadow-lg z-10">
                            {generation.progress}%
                          </div>
                        </div>
                      </div>
                    )}

                    {isFailed && (
                      <div className="absolute inset-0 bg-black/50 overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-red-500/60 via-red-500/40 to-red-400/30 transition-all duration-500 ease-out"
                          style={{
                            height: `${generation.progress}%`,
                          }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-red-400 text-xs font-semibold drop-shadow-lg z-10">
                            Failed
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white mb-1 truncate">
                      {generation.title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {generation.prompt}
                    </p>
                  </div>

                  {!isGenerating && !isFailed && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                        aria-label="Dislike"
                      >
                        <ThumbsDown className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
                      <div className="px-3 py-1.5 rounded-lg border border-gray-600 text-sm text-gray-300 font-medium">
                        v1
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                        aria-label="More options"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
                    </div>
                  )}

                  {isFailed && (
                    <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400 font-medium">
                      Failed
                    </div>
                  )}
                </div>
              </CustomAnimate>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
