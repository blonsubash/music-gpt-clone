"use client";

import { useEffect, useRef, useState } from "react";
import { useGenerationStore } from "@/lib/store";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Music } from "lucide-react";

export function FloatingMusicPlayer() {
  const {
    currentGeneration,
    isPlaying,
    currentTime,
    duration,
    volume,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
  } = useGenerationStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Update audio element when currentGeneration changes
  useEffect(() => {
    if (audioRef.current && currentGeneration?.audioUrl) {
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentGeneration?.audioUrl, setCurrentTime, setDuration]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration when loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time helper
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Don't render if no track is selected
  if (!currentGeneration || !currentGeneration.audioUrl) {
    return null;
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentGeneration.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
        {/* Progress bar */}
        <div
          className="h-1 bg-border cursor-pointer group relative"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-accent-purple transition-all duration-100 group-hover:bg-purple-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-accent-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Player content */}
        <div className="flex items-center justify-between px-4 py-3 h-20 gap-4">
          {/* Left: Track info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-hover shrink-0">
              {currentGeneration.thumbnailUrl ? (
                <Image
                  src={currentGeneration.thumbnailUrl}
                  alt={currentGeneration.prompt}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-text-tertiary" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                {currentGeneration.prompt}
              </div>
              <div className="text-xs text-text-secondary truncate">
                MusicGPT
              </div>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 hover:bg-hover rounded-full transition-colors shrink-0 ${
                isLiked ? "text-accent-red" : "text-text-secondary"
              }`}
              aria-label="Like"
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Center: Playback controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
              aria-label="Previous"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-text-primary text-background rounded-full hover:scale-105 transition-transform shadow-md"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
              aria-label="Next"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Time, volume, and more */}
          <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
            <div className="text-xs text-text-secondary flex items-center gap-2 shrink-0">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
                className="p-2 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary"
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent-purple hover:accent-purple-500 transition-colors"
              />
            </div>
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary shrink-0"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

