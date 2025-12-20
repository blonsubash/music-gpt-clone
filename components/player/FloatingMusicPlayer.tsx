"use client";

import { useEffect, useRef, useState } from "react";
import { useGenerationStore } from "@/lib/store";
import { X, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";
import { VerticalPlayer } from "./VerticalPlayer";
import { HorizontalPlayer } from "./HorizontalPlayer";

type LayoutMode = "vertical" | "horizontal";

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
    setCurrentGeneration,
  } = useGenerationStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [layout, setLayout] = useState<LayoutMode>("horizontal");
  const [previousVolume, setPreviousVolume] = useState(1);

  const toggleLayout = () => {
    setLayout((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  const handleClose = () => {
    setIsPlaying(false);
    setCurrentGeneration(null);
  };

  const handleVolumeToggle = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentGeneration?.audioUrl) {
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentGeneration?.audioUrl, setCurrentTime, setDuration]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

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

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentGeneration || !currentGeneration.audioUrl) {
    return null;
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const playerProps = {
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
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentGeneration.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div
        className={`group fixed z-50 bg-prompt-input-background backdrop-blur-lg border border-border shadow-2xl rounded-2xl overflow-visible transition-all duration-300 ${
          layout === "horizontal"
            ? "bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2  md:ml-30  w-4xl"
            : "bottom-4 right-4 w-[280px]"
        }`}
      >
        <div className="absolute -top-3.5 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
          {layout === "horizontal" && (
            <div className="group/volume flex items-center bg-prompt-input-background rounded-full overflow-hidden shadow-lg">
              <div className="w-0 group-hover/volume:w-24 transition-all duration-300 ease-out overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1  mx-2   bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-text-primary [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-text-primary [&::-moz-range-thumb]:border-0"
                  aria-label="Volume"
                />
              </div>
              <button
                onClick={handleVolumeToggle}
                className="p-1.5 hover:bg-prompt-input-background/90 transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
                aria-label={volume > 0 ? "Mute" : "Unmute"}
              >
                {volume > 0 ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            </div>
          )}

          <button
            onClick={toggleLayout}
            className="p-1.5 hover:bg-prompt-input-background/90 rounded-full transition-colors text-text-secondary hover:text-text-primary bg-prompt-input-background cursor-pointer shadow-lg"
            aria-label={`Switch to ${
              layout === "vertical" ? "horizontal" : "vertical"
            } layout`}
          >
            {layout === "vertical" ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-prompt-input-background/90 rounded-full transition-colors text-text-secondary hover:text-text-primary bg-prompt-input-background shadow-lg cursor-pointer"
            aria-label="Close player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {layout === "vertical" ? (
          <VerticalPlayer {...playerProps} />
        ) : (
          <HorizontalPlayer {...playerProps} />
        )}
      </div>
    </>
  );
}
