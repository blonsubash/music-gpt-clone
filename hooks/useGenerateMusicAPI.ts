import { useState } from "react";

interface Generation {
  id: string;
  prompt: string;
  title?: string;
  status: "generating" | "completed" | "failed";
  progress: number;
  createdAt: Date;
  error?: string;
}

interface GenerateMusicResponse {
  generation: {
    id: string;
    prompt: string;
    title?: string;
    status: "generating" | "completed" | "failed";
    progress: number;
    createdAt: string;
    error?: string;
  };
}

interface UseGenerateMusicAPIReturn {
  generateMusic: (prompt: string) => Promise<Generation | null>;
  isSubmitting: boolean;
  error: Error | null;
}

export function useGenerateMusicAPI(): UseGenerateMusicAPIReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateMusic = async (prompt: string): Promise<Generation | null> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to start generation");
      }

      const data: GenerateMusicResponse = await response.json();
      const generation: Generation = {
        ...data.generation,
        createdAt: new Date(data.generation.createdAt),
      };

      return generation;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error("Unknown error");
      setError(errorObj);
      console.error("Error submitting prompt:", errorObj);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    generateMusic,
    isSubmitting,
    error,
  };
}
