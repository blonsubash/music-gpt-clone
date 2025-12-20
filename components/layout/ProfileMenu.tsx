"use client";

import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Download,
  MoreVertical,
  Music,
  Info,
  ChevronRight,
  Settings,
  X,
} from "lucide-react";
import { useGenerationStore } from "@/lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getThumbnailUrl } from "@/lib/imageUtils";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const generations = useGenerationStore((state) => state.generations);
  const setCurrentGeneration = useGenerationStore(
    (state) => state.setCurrentGeneration
  );
  const setIsPlaying = useGenerationStore((state) => state.setIsPlaying);
  const invalidPrompt = useGenerationStore((state) => state.invalidPrompt);
  const setInvalidPrompt = useGenerationStore(
    (state) => state.setInvalidPrompt
  );
  const insufficientCredit = useGenerationStore(
    (state) => state.insufficientCredit
  );
  const setInsufficientCredit = useGenerationStore(
    (state) => state.setInsufficientCredit
  );
  const failedGeneration = useGenerationStore(
    (state) => state.failedGeneration
  );
  const setFailedGeneration = useGenerationStore(
    (state) => state.setFailedGeneration
  );
  const setIsProfileMenuOpen = useGenerationStore(
    (state) => state.setIsProfileMenuOpen
  );
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      const animationTimer = setTimeout(() => setIsAnimating(false), 0);
      const renderTimer = setTimeout(() => setShouldRender(false), 300);
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(renderTimer);
      };
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out  ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute right-0 top-13 z-50 w-96 rounded-[1.25rem] overflow-hidden transition-all duration-300 ease-out origin-top-right ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2"
        }`}
        style={{
          background: "#16191C",
          border: "1px solid #1D2125",
          boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.478)",
        }}
      >
        <div className="p-6 space-y-4 max-h-150 w-100 max-w-100 overflow-y-auto custom-scrollbar">
          <div className="pb-4 border-b border-border space-y-4">
            <div className="flex gap-4 items-center">
              <div
                className="relative w-15 h-15 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(312.58deg, rgba(200, 0, 255, 0.05) 17.25%, rgba(255, 44, 155, 0.05) 37.17%, rgba(255, 123, 0, 0.05) 62.95%, rgba(255, 133, 4, 0.05) 75.03%, rgba(255, 211, 99, 0.05) 82.54%)",
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                  position: "relative",
                }}
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
                  }}
                />
                <span className="text-xl font-normal text-white relative z-10">
                  J
                </span>
              </div>
              <div className="flex-1 min-w-0  ">
                <h3 className="text-profile-menu-text font-medium text-base">
                  Johnny
                </h3>
                <p className="text-profile-menu-text-secondary text-sm">
                  @johnny
                </p>
              </div>
              <button
                className="p-2 hover:bg-hover rounded-lg transition-colors cursor-pointer"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-hover/50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">
                  120 / 500 credits
                </span>
                <button
                  className="p-0.5 hover:bg-hover rounded transition-colors cursor-pointer"
                  aria-label="Credits info"
                >
                  <Info className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <button className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors">
                <span className="text-sm font-medium">Top Up</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {invalidPrompt && (
            <div className="bg-hover rounded-xl p-4 space-y-3 border border-border">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl">
                  😢
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Invalid Prompt
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Your prompt does not seem to be valid. Please provide a
                    prompt related to song creation, remixing, covers, or
                    similar music tasks.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setInvalidPrompt(null);
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Retry
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(invalidPrompt);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Copy prompt
                </button>
              </div>
            </div>
          )}

          {insufficientCredit && (
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-yellow-500/30 relative">
              <button
                onClick={() => setInsufficientCredit(false)}
                className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <div className="flex gap-3 items-start mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="text-yellow-400 font-semibold text-base mb-1">
                    Insufficient credits
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Your credit balance : 0
                  </p>
                </div>
              </div>
              <button className="w-full px-6 py-2.5 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-colors border border-white/20 cursor-pointer">
                Top Up
              </button>
            </div>
          )}

          {failedGeneration && (
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-red-500/30 relative">
              <button
                onClick={() => setFailedGeneration(null)}
                className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <div className="flex gap-3 items-start mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl">❌</span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="text-red-400 font-semibold text-base mb-1">
                    Generation Failed
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {failedGeneration.error ||
                      "An error occurred during generation"}
                  </p>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    Prompt: {failedGeneration.prompt}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFailedGeneration(null);
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Retry
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(failedGeneration.prompt);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Copy prompt
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {generations.length === 0 ? (
              <div className="text-center py-8 text-text-secondary text-sm">
                No generations yet
              </div>
            ) : (
              generations.map((generation) => (
                <div
                  key={generation.id}
                  className={`flex gap-3 p-2 rounded-lg transition-colors ${
                    generation.status === "completed" && generation.audioUrl
                      ? "cursor-pointer hover:bg-hover"
                      : "cursor-default"
                  }`}
                  onClick={() => {
                    if (
                      generation.status === "completed" &&
                      generation.audioUrl
                    ) {
                      setCurrentGeneration(generation);
                      setIsPlaying(true);
                      onClose();
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-linear-to-b from-blue-300 to-blue-500 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                    {generation.thumbnailUrl ? (
                      <Image
                        src={getThumbnailUrl(generation.thumbnailUrl)}
                        alt={generation.prompt}
                        fill
                        className={`object-cover transition-all duration-700 ease-out ${
                          generation.status === "generating" ||
                          generation.status === "failed"
                            ? "opacity-30 scale-105 blur-sm"
                            : "opacity-100 scale-100 blur-0"
                        }`}
                      />
                    ) : (
                      <Music className="w-8 h-8 text-white" />
                    )}
                    {generation.status === "generating" && (
                      <div className="absolute inset-0 bg-black/50 overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-blue-400/80 via-cyan-400/80 to-green-400/80 transition-all duration-500 ease-out"
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
                    {generation.status === "failed" && (
                      <div className="absolute inset-0 bg-black/50 overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-red-500/80 via-red-500/60 to-red-400/40 transition-all duration-500 ease-out"
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

                  <div className="flex items-center gap-2 shrink-0">
                    {generation.status === "completed" && (
                      <>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 hover:bg-active rounded transition-colors cursor-pointer"
                          aria-label="Like"
                        >
                          <ThumbsUp className="w-4 h-4 text-text-secondary fill-text-secondary" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 hover:bg-active rounded transition-colors cursor-pointer"
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
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 hover:bg-active rounded transition-colors cursor-pointer"
                            aria-label="Download"
                          >
                            <Download className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 hover:bg-active rounded transition-colors cursor-pointer"
                            aria-label="More options"
                          >
                            <MoreVertical className="w-4 h-4 text-text-secondary" />
                          </button>
                        </>
                      )}
                    {generation.status === "failed" && (
                      <div className="text-red-400 text-xs font-medium px-2 py-1 bg-red-500/10 rounded">
                        Failed
                      </div>
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
