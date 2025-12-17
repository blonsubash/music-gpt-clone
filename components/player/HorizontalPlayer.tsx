"use client";

import Image from "next/image";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
  MoreHorizontal,
  Music,
} from "lucide-react";
import { PlayerControlsProps } from "./PlayerProps";
import { getThumbnailUrl } from "@/lib/imageUtils";

export function HorizontalPlayer({
  currentGeneration,
  isPlaying,
  currentTime,
  duration,
  volume,
  isLiked,
  progressPercentage,
  setIsPlaying,
  setVolume,
  setIsLiked,
  handleProgressClick,
  formatTime,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 w-full">
      <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden bg-hover shrink-0">
        {currentGeneration.thumbnailUrl ? (
          <Image
            src={getThumbnailUrl(currentGeneration.thumbnailUrl)}
            alt={currentGeneration.prompt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-8 h-8 md:w-10 md:h-10 text-text-tertiary" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {/* Title section */}
        <div className="mb-2 md:mb-3">
          <div className="text-xs md:text-sm font-semibold text-text-primary truncate mb-0.5">
            {currentGeneration.prompt}
          </div>
          <div className="text-[10px] md:text-xs text-text-secondary">
            MusicGPT
          </div>
        </div>

        <div
          className="progress-bar h-1.5 bg-border cursor-pointer group relative rounded-full mb-2"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-accent-orange rounded-full transition-all duration-100 group-hover:bg-orange-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-accent-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-3">
          <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-text-secondary min-w-fit">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="p-1 md:p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
              aria-label="Previous"
            >
              <SkipBack className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 md:p-2.5 bg-accent-orange text-white rounded-full hover:scale-105 transition-transform shadow-lg"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current cursor-pointer" />
              ) : (
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5 cursor-pointer" />
              )}
            </button>
            <button
              className="p-1 md:p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
              aria-label="Next"
            >
              <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1 md:p-1.5 hover:bg-hover rounded-full transition-colors  ${
                isLiked ? "text-accent-red" : "text-text-secondary"
              } cursor-pointer`}
              aria-label="Like"
            >
              <Heart
                className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                  isLiked ? "fill-current" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="p-1 md:p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 cursor-pointer" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 cursor-pointer" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="hidden md:block w-16 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent-orange hover:accent-orange-500 transition-colors"
            />

            <button
              className="hidden md:block p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
