"use client";

import { useGenerationStore } from "@/lib/store";
import { motion } from "framer-motion";
import Image from "next/image";
import { getThumbnailWithFallback } from "@/lib/imageUtils";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  MobileActions,
  DesktopActions,
  PlayButton,
  GenerationProgress,
  GenerationFailed,
  FailedStatus,
  GenerationPromptWithAnimation,
  GenerationPrompt,
  VersionBadge,
  GenerationTitle,
  PromptGradientOverlay,
  GeneratingGradientOverlay,
} from "./GenerationItemActions";
import { getProgressBorderGradient } from "./generation-utils";
import { GenerationItemProps } from "./interfaces";
import {
  badgeClasses,
  containerClasses,
  innerContainerClasses,
  thumbnailContainerClasses,
  thumbnailInnerClasses,
} from "./generation-variants";

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
  const isMobile = useIsMobile();

  const isGenerating = generation.status === "generating";
  const isFailed = generation.status === "failed";

  const handleClick = () => {
    if (generation.status === "completed" && generation.audioUrl) {
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
      {isGenerating && (
        <GeneratingGradientOverlay
          variant={variant}
          progress={generation.progress}
        />
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

            {!isGenerating && !isFailed && <PlayButton variant={variant} />}

            {isGenerating && (
              <GenerationProgress
                variant={variant}
                progress={generation.progress}
              />
            )}

            {isFailed && (
              <GenerationFailed
                variant={variant}
                progress={generation.progress}
              />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 relative">
          <GenerationTitle
            variant={variant}
            generationTitle={generation.title || ""}
            isGenerating={isGenerating}
            generationPrompt={generation.prompt}
          />
          <div className="relative">
            {isGenerating ? (
              <GenerationPromptWithAnimation
                variant={variant}
                progress={generation.progress}
              />
            ) : (
              <GenerationPrompt variant={variant} prompt={generation.prompt} />
            )}
            {!isGenerating && !isFailed && variant === "default" && (
              <PromptGradientOverlay />
            )}
          </div>

          {isGenerating && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <VersionBadge
                className={`relative ${badgeClasses[variant]} border border-border-100 text-profile-menu-text-secondary font-medium bg-background`}
              />
            </div>
          )}

          {!isGenerating &&
            !isFailed &&
            (isMobile ? (
              <MobileActions variant={variant} />
            ) : (
              <DesktopActions variant={variant} />
            ))}
        </div>

        {isFailed && <FailedStatus />}
      </div>
    </motion.div>
  );
}
