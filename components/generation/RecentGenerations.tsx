"use client";

import { useGenerationStore } from "@/lib/store";
import { CustomAnimate } from "@/components/ui/Animate";
import { AnimatePresence } from "framer-motion";
import { Play, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";

// Random Unsplash images for thumbnails
const THUMBNAIL_IMAGES = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
];

const getRandomThumbnail = (index: number) => {
  return THUMBNAIL_IMAGES[index % THUMBNAIL_IMAGES.length];
};

export function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);
  const setCurrentGeneration = useGenerationStore(
    (state) => state.setCurrentGeneration
  );
  const setIsPlaying = useGenerationStore((state) => state.setIsPlaying);

  if (generations.length === 0) {
    return null;
  }
  console.log(generations);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Recent generations
      </h2>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {generations.slice(0, 6).map((generation, index) => {
            const isGenerating = generation.status === "generating";
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
                  isGenerating
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-white/5"
                }`}
                onClick={() => {
                  if (
                    generation.status === "completed" &&
                    generation.audioUrl
                  ) {
                    setCurrentGeneration(generation);
                    setIsPlaying(true);
                  }
                }}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-hover">
                    <Image
                      src={getRandomThumbnail(index)}
                      alt={generation.prompt}
                      fill
                      className="object-cover"
                    />

                    {/* Play button overlay on hover */}
                    {!isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-out">
                          <Play className="w-5 h-5 text-black fill-black" />
                        </div>
                      </div>
                    )}

                    {/* Generating progress overlay */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-xs font-medium">
                          {generation.progress}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white mb-1 truncate">
                      {generation.title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {generation.prompt}
                    </p>
                  </div>

                  {/* Action buttons - visible on hover */}
                  {!isGenerating && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle like
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle dislike
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
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
                          // Handle more options
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        aria-label="More options"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </button>
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
