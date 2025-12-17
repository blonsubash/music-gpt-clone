import { create } from "zustand";

export type GenerationStatus =
  | "pending"
  | "generating"
  | "completed"
  | "failed";

export interface Generation {
  id: string;
  prompt: string;
  title?: string;
  status: GenerationStatus;
  progress: number;
  audioUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

interface GenerationStore {
  generations: Generation[];
  currentGeneration: Generation | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  invalidPrompt: string | null;
  insufficientCredit: boolean;
  failedGeneration: Generation | null;
  isProfileMenuOpen: boolean;
  addGeneration: (generation: Generation) => void;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  setCurrentGeneration: (generation: Generation | null) => void;
  getGenerationById: (id: string) => Generation | undefined;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setInvalidPrompt: (prompt: string | null) => void;
  setInsufficientCredit: (insufficient: boolean) => void;
  setFailedGeneration: (generation: Generation | null) => void;
  setIsProfileMenuOpen: (isOpen: boolean) => void;
}

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  generations: [],
  currentGeneration: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  invalidPrompt: null,
  insufficientCredit: false,
  failedGeneration: null,
  isProfileMenuOpen: false,

  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
    })),

  updateGeneration: (id, updates) =>
    set((state) => {
      const generations = state.generations.map((gen) =>
        gen.id === id ? { ...gen, ...updates } : gen
      );
      const currentGeneration =
        state.currentGeneration?.id === id
          ? { ...state.currentGeneration, ...updates }
          : state.currentGeneration;
      return { generations, currentGeneration };
    }),

  setCurrentGeneration: (generation) => set({ currentGeneration: generation }),

  getGenerationById: (id) => get().generations.find((gen) => gen.id === id),

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setInvalidPrompt: (prompt) => set({ invalidPrompt: prompt }),
  setInsufficientCredit: (insufficient) =>
    set({ insufficientCredit: insufficient }),
  setFailedGeneration: (generation) => set({ failedGeneration: generation }),
  setIsProfileMenuOpen: (isOpen) => set({ isProfileMenuOpen: isOpen }),
}));
