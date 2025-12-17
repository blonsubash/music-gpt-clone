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

export function VerticalPlayer({
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
    <div className="flex flex-col">
      <div className="relative w-full h-32 bg-hover">
        {currentGeneration.thumbnailUrl ? (
          <Image
            src={getThumbnailUrl(currentGeneration.thumbnailUrl)}
            alt={currentGeneration.prompt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 text-text-tertiary" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-card/90 to-transparent" />
      </div>

      <div className="p-3">
        <div className="mb-3">
          <div className="text-xs font-semibold text-text-primary truncate mb-0.5">
            {currentGeneration.prompt}
          </div>
          <div className="text-xs text-text-secondary">MusicGPT</div>
        </div>

        <div
          className="progress-bar h-1 bg-border cursor-pointer group relative rounded-full mb-2"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-accent-orange rounded-full transition-all duration-100 group-hover:bg-orange-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-accent-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
        </div>

        <div className="flex justify-between text-xs text-text-secondary mb-3">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
            aria-label="Previous"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-accent-orange text-white rounded-full hover:scale-105 transition-transform shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <button
            className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
            aria-label="Next"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1.5 hover:bg-hover rounded-full transition-colors ${
              isLiked ? "text-accent-red" : "text-text-secondary"
            }`}
            aria-label="Like"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent-orange hover:accent-orange-500 transition-colors"
            />
          </div>

          <button
            className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
