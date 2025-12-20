"use client";

import { useGenerationStore, type Generation } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { Play, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { getThumbnailWithFallback } from "@/lib/imageUtils";
import { ThumbsUpIcon, ThumbsDownIcon } from "@/app/assets/icons";

export const getProgressBorderGradient = (progress: number): string => {
  if (progress === 0) {
    return "radial-gradient(227.54% 59.42% at 42.03% 86.23%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 0 && progress <= 25) {
    return "radial-gradient(381.16% 99.21% at 83.33% 78.99%, #FF6200 0%, rgba(170, 0, 255, 0.5) 48.76%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 25 && progress <= 50) {
    return "radial-gradient(256.72% 316.94% at -26.81% 115.94%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 50 && progress <= 75) {
    return "radial-gradient(134.78% 607.75% at 85.51% -94.93%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 75 && progress < 100) {
    return "radial-gradient(806.32% 145.65% at 94.2% 0%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else {
    return "radial-gradient(555.92% 279.47% at 41.3% 100%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  }
};

export const getLoadingText = (progress: number): string => {
  if (progress < 30) {
    return "Starting AI audio engine...";
  } else if (progress >= 30 && progress < 60) {
    return "Initializing sound models...";
  } else {
    return "Processing your audio...";
  }
};

type GenerationItemVariant = "default" | "compact";

interface GenerationItemProps {
  generation: Generation;
  index: number;
  variant?: GenerationItemVariant;
  onClose?: () => void;
}

export function GenerationItem({
  generation,
  index,
  variant = "default",
  onClose,
}: GenerationItemProps) {
  const setCurrentGeneration = useGenerationStore(
    (state) => state.setCurrentGeneration
  );
  const setIsPlaying = useGenerationStore((state) => state.setIsPlaying);

  const isGenerating = generation.status === "generating";
  const isFailed = generation.status === "failed";

  const containerClasses = {
    default: "rounded-2xl hover:bg-[#1D2125]",
    compact: "rounded-xl hover:bg-hover",
  };

  const innerContainerClasses = {
    default: "px-2 py-2.5 h-20",
    compact: "p-2 h-16",
  };

  const thumbnailContainerClasses = {
    default: "w-15 h-15 rounded-2xl",
    compact: "w-12 h-12 rounded-lg",
  };

  const thumbnailInnerClasses = {
    default: "rounded-2xl",
    compact: "rounded-lg",
  };

  const titleClasses = {
    default: "text-base mb-1",
    compact: "text-sm mb-0.5",
  };

  const descriptionClasses = {
    default: "text-sm pr-40 whitespace-nowrap overflow-hidden",
    compact: "text-xs truncate",
  };

  const playIconClasses = {
    default: "w-4 h-4",
    compact: "w-4 h-4",
  };

  const progressTextClasses = {
    default: "text-xs",
    compact: "text-xs",
  };

  const badgeClasses = {
    default: "px-3 py-1 rounded-[0.625rem] text-sm",
    compact: "px-2 py-0.5 rounded-lg text-xs",
  };

  const actionButtonClasses = {
    default: "p-2.5",
    compact: "p-1.5",
  };

  const actionIconSize = {
    default: { width: 20, height: 20 },
    compact: { width: 16, height: 16 },
  };

  const moreIconClasses = {
    default: "w-5 h-5",
    compact: "w-4 h-4",
  };

  const actionGapClasses = {
    default: "gap-2",
    compact: "gap-1",
  };

  const gradientClasses = {
    default: "gap-4 -left-16 from-[#1D2125] via-[#1D2125]/90",
    compact: "gap-3 -left-12 from-hover via-hover/90",
  };

  const handleClick = () => {
    if (generation.status === "completed" && generation.audioUrl) {
      console.log("Setting current generation and playing...");
      setCurrentGeneration(generation);
      setIsPlaying(true);
      onClose?.();
    } else {
      console.log("Condition not met - status or audioUrl missing");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`group relative overflow-hidden transition-all duration-300 ease-out ${
        containerClasses[variant]
      } ${isGenerating || isFailed ? "cursor-default" : "cursor-pointer"}`}
      onClick={handleClick}
    >
      {/* Smooth left-to-right filling background during generation */}
      {isGenerating && (
        <div
          className={`absolute inset-0 overflow-hidden ${
            variant === "default" ? "rounded-2xl" : "rounded-xl"
          }`}
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
            style={{
              width: `${generation.progress}%`,
              background: "rgba(255, 255, 255, 0.05)",
            }}
          />
        </div>
      )}

      <div
        className={`flex items-center ${
          variant === "default" ? "gap-4" : "gap-3"
        } ${innerContainerClasses[variant]} relative`}
        style={{ zIndex: 1 }}
      >
        <div
          className={`relative shrink-0 p-px ${thumbnailContainerClasses[variant]}`}
          style={{
            background: isGenerating
              ? getProgressBorderGradient(generation.progress)
              : "transparent",
            transition: "background 1.5s ease-out",
          }}
        >
          <div
            className={`relative w-full h-full overflow-hidden ${thumbnailInnerClasses[variant]}`}
            style={{
              background: isGenerating
                ? getProgressBorderGradient(generation.progress)
                : "#2a2a2a",
              transition: "background 1.5s ease-out",
            }}
          >
            <Image
              src={getThumbnailWithFallback(generation.thumbnailUrl, index)}
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
                <Play
                  className={`${playIconClasses[variant]} text-white fill-white`}
                />
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`${progressTextClasses[variant]} text-white/50 font-medium drop-shadow-lg z-10`}
                >
                  {generation.progress}%
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
                  <div
                    className={`${progressTextClasses[variant]} text-red-400 font-semibold drop-shadow-lg z-10`}
                  >
                    Failed
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 relative">
          <h3
            className={`${titleClasses[variant]} font-${
              variant === "default" ? "normal" : "medium"
            } truncate ${
              isGenerating ? "text-glow-flow" : "text-profile-menu-text"
            }`}
          >
            {isGenerating ? generation.prompt : generation.title || "Untitled"}
          </h3>
          <div className="relative">
            {isGenerating ? (
              <AnimatePresence mode="wait">
                <motion.p
                  key={getLoadingText(generation.progress)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`${descriptionClasses[variant]} text-profile-menu-text-secondary font-normal`}
                >
                  {getLoadingText(generation.progress)}
                </motion.p>
              </AnimatePresence>
            ) : (
              <p
                className={`${descriptionClasses[variant]} text-profile-menu-text-secondary font-normal`}
              >
                {generation.prompt}
              </p>
            )}
            {!isGenerating && !isFailed && variant === "default" && (
              <>
                <div
                  className={`absolute right-0 top-0 bottom-0 w-48 pointer-events-none transition-opacity duration-300 ease-out group-hover:opacity-0`}
                  style={{
                    background: `linear-gradient(to left, var(--background) 0%, var(--background) 40%, transparent 100%)`,
                  }}
                />

                <div
                  className={`absolute right-0 top-0 bottom-0 w-48 pointer-events-none transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100`}
                  style={{
                    background: `linear-gradient(to left, #1D2125 0%, #1D2125 40%, transparent 100%)`,
                  }}
                />
              </>
            )}
          </div>

          {isGenerating && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div
                className={`relative ${badgeClasses[variant]} border border-border-100 text-profile-menu-text-secondary font-medium bg-background`}
              >
                v1
              </div>
            </div>
          )}

          {!isGenerating && !isFailed && (
            <>
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${actionGapClasses[variant]} group-hover:opacity-0 transition-opacity duration-300 ease-out`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
                  aria-label="More options"
                >
                  <MoreHorizontal
                    className={`${moreIconClasses[variant]} text-gray-400 hover:text-white transition-colors`}
                  />
                </button>
              </div>

              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${actionGapClasses[variant]} opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-4 group-hover:translate-x-0`}
              >
                <div
                  className={`absolute inset-0 ${gradientClasses[variant]} to-transparent pointer-events-none h-full transition-all duration-300 ease-out`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
                  aria-label="Like"
                >
                  <Image
                    src={ThumbsUpIcon}
                    alt="Thumbs Up"
                    {...actionIconSize[variant]}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
                  aria-label="Dislike"
                >
                  <Image
                    src={ThumbsDownIcon}
                    alt="Thumbs Down"
                    {...actionIconSize[variant]}
                  />
                </button>
                <div
                  className={`relative ${badgeClasses[variant]} hover:bg-white/10 border border-border-100 text-profile-menu-text-secondary font-medium z-10`}
                >
                  v1
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
                  aria-label="More options"
                >
                  <MoreHorizontal
                    className={`${moreIconClasses[variant]} text-gray-400 hover:text-white transition-colors`}
                  />
                </button>
              </div>
            </>
          )}
        </div>

        {isFailed && (
          <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400 font-medium">
            Failed
          </div>
        )}
      </div>
    </motion.div>
  );
}
