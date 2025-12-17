"use client";

import { useEffect, useRef, useState } from "react";
import { useGenerationStore } from "@/lib/store";
import { X, Maximize2, Minimize2 } from "lucide-react";
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

  console.log(
    "FloatingMusicPlayer render - currentGeneration:",
    currentGeneration
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [layout, setLayout] = useState<LayoutMode>("horizontal");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  const handleClose = () => {
    setIsPlaying(false);
    setCurrentGeneration(null);
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
        className={`fixed z-50 bg-card/95 backdrop-blur-lg border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${
          layout === "horizontal"
            ? "bottom-4 left-1/2 -translate-x-1/2  ml-30"
            : "bottom-4 right-4"
        }`}
        style={{
          width: layout === "vertical" ? "280px" : "600px",
        }}
      >
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            onClick={toggleLayout}
            className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary bg-card/80"
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
            className="p-1.5 hover:bg-hover rounded-full transition-colors text-text-secondary hover:text-text-primary bg-card/80"
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
