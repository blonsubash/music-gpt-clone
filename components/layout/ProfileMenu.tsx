"use client";

import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Download,
  MoreVertical,
  Music,
} from "lucide-react";
import { useGenerationStore } from "@/lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const generations = useGenerationStore((state) => state.generations);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute right-0 top-12 z-50 w-96 bg-card rounded-lg border border-border shadow-xl overflow-hidden transition-all duration-300 ease-out origin-top-right ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2"
        }`}
      >
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          <div className="space-y-3">
            {generations.length === 0 ? (
              <div className="text-center py-8 text-text-secondary text-sm">
                No generations yet
              </div>
            ) : (
              generations.map((generation) => (
                <div
                  key={generation.id}
                  className="flex gap-3 p-2 rounded-lg hover:bg-hover transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                    {generation.thumbnailUrl ? (
                      <Image
                        src={generation.thumbnailUrl}
                        alt={generation.prompt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Music className="w-8 h-8 text-white" />
                    )}
                    {generation.status === "generating" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-xs font-medium">
                          {generation.progress}%
                        </div>
                      </div>
                    )}
                    {generation.status === "completed" &&
                      generation.audioUrl && (
                        <Play className="w-6 h-6 text-white fill-white absolute" />
                      )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">
                      {generation.prompt}
                    </h4>
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

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {generation.status === "completed" && (
                      <>
                        <button
                          className="p-1.5 hover:bg-active rounded transition-colors"
                          aria-label="Like"
                        >
                          <ThumbsUp className="w-4 h-4 text-text-secondary fill-text-secondary" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-active rounded transition-colors"
                          aria-label="Dislike"
                        >
                          <ThumbsDown className="w-4 h-4 text-text-secondary" />
                        </button>
                      </>
                    )}
                    {generation.status === "completed" &&
                      generation.audioUrl && (
                        <>
                          <button
                            className="p-1.5 hover:bg-active rounded transition-colors"
                            aria-label="Download"
                          >
                            <Download className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-active rounded transition-colors"
                            aria-label="More options"
                          >
                            <MoreVertical className="w-4 h-4 text-text-secondary" />
                          </button>
                        </>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
