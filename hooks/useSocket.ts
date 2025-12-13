"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGenerationStore } from "@/lib/store";

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const updateGeneration = useGenerationStore(
    (state) => state.updateGeneration
  );

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    });

    socket.on("generation-update", (data) => {
      console.log("Generation update received:", data);

      const { id, status, progress, audioUrl, thumbnailUrl, completedAt } =
        data;

      updateGeneration(id, {
        status,
        progress,
        ...(audioUrl && { audioUrl }),
        ...(thumbnailUrl && { thumbnailUrl }),
        ...(completedAt && { completedAt: new Date(completedAt) }),
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [updateGeneration]);

  const startGeneration = (id: string, prompt: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("start-generation", { id, prompt });
    }
  };

  return {
    isConnected,
    startGeneration,
  };
}
