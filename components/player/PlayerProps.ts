import { Generation } from "@/lib/store";

export interface PlayerControlsProps {
  currentGeneration: Generation;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLiked: boolean;
  progressPercentage: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setIsLiked: (isLiked: boolean) => void;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (seconds: number) => string;
}
