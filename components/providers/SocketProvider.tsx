"use client";

import { useSocket } from "@/hooks/useSocket";
import { createContext, useContext, ReactNode } from "react";

interface SocketContextType {
  isConnected: boolean;
  startGeneration: (id: string, prompt: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  startGeneration: () => {},
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketData = useSocket();

  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(SocketContext);
}
