import { MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import { ThumbsUpIcon, ThumbsDownIcon } from "@/app/assets/icons";
import {
  ActionButtonProps,
  DesktopActionsProps,
  MobileActionsProps,
} from "./interfaces";
import {
  actionButtonClasses,
  actionGapClasses,
  actionIconSize,
  badgeClasses,
  descriptionClasses,
  gradientClasses,
  moreIconClasses,
  playIconClasses,
  progressTextClasses,
  titleClasses,
} from "./generation-variants";
import { AnimatePresence, motion } from "framer-motion";
import { getLoadingText } from "./generation-utils";

function ActionButton({
  onClick,
  ariaLabel,
  className,
  icon,
  iconSize,
  iconClassName,
}: ActionButtonProps) {
  return (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      {icon ? (
        <Image src={icon} alt={ariaLabel} {...iconSize} />
      ) : (
        <MoreHorizontal className={iconClassName} />
      )}
    </button>
  );
}

interface VersionBadgeProps {
  className: string;
}

export function VersionBadge({ className }: VersionBadgeProps) {
  return <div className={className}>v1</div>;
}

export function MobileActions({ variant }: MobileActionsProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${actionGapClasses[variant]}`}
    >
      <div
        className={`absolute inset-0 ${gradientClasses[variant]} to-transparent pointer-events-none h-full`}
      />
      <ActionButton
        onClick={handleClick}
        ariaLabel="Like"
        className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer z-10`}
        icon={ThumbsUpIcon}
        iconSize={actionIconSize[variant]}
      />
      <ActionButton
        onClick={handleClick}
        ariaLabel="Dislike"
        className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer z-10`}
        icon={ThumbsDownIcon}
        iconSize={actionIconSize[variant]}
      />
      <VersionBadge
        className={`relative ${badgeClasses[variant]} hover:bg-white/10 active:bg-white/20 border border-border-100 text-profile-menu-text-secondary font-medium z-10`}
      />
      <ActionButton
        onClick={handleClick}
        ariaLabel="More options"
        className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 cursor-pointer z-10`}
        iconClassName={`${moreIconClasses[variant]} text-gray-400 hover:text-white transition-colors`}
      />
    </div>
  );
}

export function DesktopActions({ variant }: DesktopActionsProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${actionGapClasses[variant]} group-hover:opacity-0 transition-opacity duration-300 ease-out`}
      >
        <ActionButton
          onClick={handleClick}
          ariaLabel="More options"
          className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
          iconClassName={`${moreIconClasses[variant]} text-gray-400 hover:text-white transition-colors`}
        />
      </div>

      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${actionGapClasses[variant]} opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-4 group-hover:translate-x-0`}
      >
        <div
          className={`absolute inset-0 ${gradientClasses[variant]} to-transparent pointer-events-none h-full transition-all duration-300 ease-out`}
        />
        <ActionButton
          onClick={handleClick}
          ariaLabel="Like"
          className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
          icon={ThumbsUpIcon}
          iconSize={actionIconSize[variant]}
        />
        <ActionButton
          onClick={handleClick}
          ariaLabel="Dislike"
          className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
          icon={ThumbsDownIcon}
          iconSize={actionIconSize[variant]}
        />
        <VersionBadge
          className={`relative ${badgeClasses[variant]} hover:bg-white/10 border border-border-100 text-profile-menu-text-secondary font-medium z-10`}
        />
        <ActionButton
          onClick={handleClick}
          ariaLabel="More options"
          className={`relative ${actionButtonClasses[variant]} rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10`}
          iconClassName={`${moreIconClasses[variant]} text-gray-400 hover:text-white transition-colors`}
        />
      </div>
    </>
  );
}

export function PlayButton({ variant }: { variant: "default" | "compact" }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
      <Play className={`${playIconClasses[variant]} text-white fill-white`} />
    </div>
  );
}

export function GenerationProgress({
  variant,
  progress,
}: {
  variant: "default" | "compact";
  progress: number;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${progressTextClasses[variant]} text-white/50 font-medium drop-shadow-lg z-10`}
      >
        {progress}%
      </div>
    </div>
  );
}

export function GenerationFailed({
  variant,
  progress,
}: {
  variant: "default" | "compact";
  progress: number;
}) {
  return (
    <div className="absolute inset-0 bg-black/50 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-red-500/60 via-red-500/40 to-red-400/30 transition-all duration-500 ease-out"
        style={{
          height: `${progress}%`,
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
  );
}

export function FailedStatus() {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400 font-medium">
      Failed
    </div>
  );
}

export function GenerationPromptWithAnimation({
  variant,
  progress,
}: {
  variant: "default" | "compact";
  progress: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={getLoadingText(progress)}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`${descriptionClasses[variant]} text-profile-menu-text-secondary font-normal`}
      >
        {getLoadingText(progress)}
      </motion.p>
    </AnimatePresence>
  );
}

export function GenerationPrompt({
  variant,
  prompt,
}: {
  variant: "default" | "compact";
  prompt: string;
}) {
  return (
    <p
      className={`${descriptionClasses[variant]} text-profile-menu-text-secondary font-normal`}
    >
      {prompt}
    </p>
  );
}

export function GenerationTitle({
  variant,
  generationTitle,
  isGenerating,
  generationPrompt,
}: {
  variant: "default" | "compact";
  generationTitle: string;
  isGenerating: boolean;
  generationPrompt: string;
}) {
  return (
    <h3
      className={`${titleClasses[variant]} font-${
        variant === "default" ? "normal" : "medium"
      } truncate ${isGenerating ? "text-glow-flow" : "text-profile-menu-text"}`}
    >
      {isGenerating ? generationPrompt : generationTitle || "Untitled"}
    </h3>
  );
}

export function PromptGradientOverlay() {
  return (
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
  );
}

export function GeneratingGradientOverlay({
  variant,
  progress,
}: {
  variant: "default" | "compact";
  progress: number;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        variant === "default" ? "rounded-2xl" : "rounded-xl"
      }`}
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
        style={{
          width: `${progress}%`,
          background: "rgba(255, 255, 255, 0.05)",
        }}
      />
    </div>
  );
}
