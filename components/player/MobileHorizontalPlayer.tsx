"use client";

import Image from "next/image";
import { Play, Pause, Heart, Volume2, VolumeX } from "lucide-react";
import { PlayerControlsProps } from "./PlayerProps";
import { getThumbnailUrl } from "@/lib/imageUtils";

export function MobileHorizontalPlayer({
  currentGeneration,
  isPlaying,
  isLiked,
  volume,
  progressPercentage,
  setIsPlaying,
  setIsLiked,
  setVolume,
  handleProgressClick,
}: PlayerControlsProps) {
  return (
    <div className="w-sm rounded-2xl overflow-hidden bg-prompt-input-background backdrop-blur-lg shadow-2xl">
      {/* Main Content Container */}
      <div className="flex items-center gap-3 p-3 pb-2">
        {/* Album Art */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-purple-900/50 shrink-0 shadow-lg">
          {currentGeneration.thumbnailUrl ? (
            <Image
              src={getThumbnailUrl(currentGeneration.thumbnailUrl)}
              alt={currentGeneration.prompt}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
              <div className="text-white text-xs font-bold">
                {currentGeneration.prompt.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Title and Artist */}
        <div className="min-w-0 flex-1">
          <div className="text-white text-base font-bold truncate">
            {currentGeneration.prompt}
          </div>
          <div className="text-purple-200 text-sm truncate">@jhonny</div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-purple-950/30 rounded-lg appearance-none cursor-pointer accent-white transition-colors"
            />
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5 text-white" strokeWidth={2} />
              ) : (
                <Volume2 className="w-5 h-5 text-white" strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Heart Icon */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer`}
            aria-label="Like"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
              strokeWidth={2}
            />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause
                className="w-6 h-6 text-white fill-white"
                strokeWidth={2}
              />
            ) : (
              <Play className="w-6 h-6 text-white fill-white" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar at Bottom */}
      <div
        className="progress-bar h-1 cursor-pointer group relative"
        onClick={handleProgressClick}
      >
        <div className="h-full bg-purple-950/30" />
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-purple-300 to-white transition-all duration-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-white/50 blur-[1px]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>
      </div>
    </div>
  );
}
