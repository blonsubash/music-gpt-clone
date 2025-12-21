"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Shuffle,
  Repeat,
  Music,
} from "lucide-react";
import { PlayerControlsProps } from "./PlayerProps";
import { getThumbnailUrl } from "@/lib/imageUtils";

export function HorizontalPlayer({
  currentGeneration,
  isPlaying,
  duration,
  isLiked,
  progressPercentage,
  setIsPlaying,

  setIsLiked,
  handleProgressClick,
  formatTime,
}: PlayerControlsProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const time = (percentage / 100) * duration;

    setTooltipPosition(offsetX);
    setHoverTime(time);
  };
  return (
    <div className="w-full rounded-2xl overflow-visible">
      <div
        ref={progressBarRef}
        className="progress-bar h-0.5 cursor-pointer group relative w-2xl ml-3"
        onClick={handleProgressClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className="h-full bg-linear-to-r from-prompt-input-background via-gray-400 to-white transition-all duration-100 relative shadow-[0_0_4px_rgba(255,255,255,0.3),0_0_8px_rgba(255,255,255,0.2)]"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-white/40 blur-[2px]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.5),0_0_36px_rgba(255,255,255,0.3)]" />
        </div>

        {showTooltip && (
          <div
            className="absolute -top-10 bg-white text-black text-xs px-3 py-1.5 rounded-lg pointer-events-none z-10 shadow-lg whitespace-nowrap"
            style={{
              left: `${tooltipPosition}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-medium">
              {formatTime(hoverTime)} / {formatTime(duration)}
            </div>

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 p-4 justify-between">
        <div className="flex items-center gap-4 min-w-0 max-w-50 flex-1">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-hover shrink-0">
            {currentGeneration.thumbnailUrl ? (
              <Image
                src={getThumbnailUrl(currentGeneration.thumbnailUrl)}
                alt={currentGeneration.prompt}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-8 h-8 text-text-tertiary" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-base font-semibold text-text-primary truncate">
              {currentGeneration.prompt}
            </div>
            <div className="text-sm text-text-secondary truncate">@jhonny</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ">
          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Previous"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform shadow-lg cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Next"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Repeat"
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0 ">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 border border-border hover:bg-white/10 rounded-full transition-all ${
              isLiked
                ? "text-accent-red border-accent-red"
                : "text-text-secondary"
            } cursor-pointer`}
            aria-label="Like"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <button
            className="px-6 py-2 border border-border hover:bg-white/10 rounded-full text-text-primary font-medium transition-all  cursor-pointer"
            aria-label="Share"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
