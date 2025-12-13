import { create } from "zustand";

export type GenerationStatus =
  | "pending"
  | "generating"
  | "completed"
  | "failed";

export interface Generation {
  id: string;
  prompt: string;
  status: GenerationStatus;
  progress: number; // 0-100
  audioUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

interface GenerationStore {
  generations: Generation[];
  currentGeneration: Generation | null;
  addGeneration: (generation: Generation) => void;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  setCurrentGeneration: (generation: Generation | null) => void;
  getGenerationById: (id: string) => Generation | undefined;
}

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  generations: [],
  currentGeneration: null,

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
}));
