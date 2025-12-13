"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  Link,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { CustomAnimate } from "@/components/ui/Animate";
import { getRandomPlaceholder } from "@/lib/placeholderUtils";
import { useSocketContext } from "@/components/providers/SocketProvider";
import { useGenerationStore } from "@/lib/store";

interface PromptInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function PromptInput({
  placeholder: externalPlaceholder,
  value: controlledValue,
  onChange,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [placeholder, setPlaceholder] = useState(
    externalPlaceholder ?? getRandomPlaceholder()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { startGeneration, isConnected } = useSocketContext();
  const { addGeneration, setCurrentGeneration } = useGenerationStore();

  const value = controlledValue ?? internalValue;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (externalPlaceholder) {
      return;
    }

    const updatePlaceholder = () => {
      setPlaceholder(getRandomPlaceholder());
    };

    const scheduleNextUpdate = () => {
      const delay = Math.floor(Math.random() * 2000) + 3000;
      intervalRef.current = setTimeout(() => {
        updatePlaceholder();
        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [externalPlaceholder]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleSubmit = async () => {
    const promptText = value.trim();
    if (!promptText || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        throw new Error("Failed to start generation");
      }

      const data = await response.json();
      const generation = {
        ...data.generation,
        createdAt: new Date(data.generation.createdAt),
      };

      addGeneration(generation);
      setCurrentGeneration(generation);

      startGeneration(generation.id, promptText);

      if (!onChange) {
        setInternalValue("");
      }
    } catch (error) {
      console.error("Error submitting prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-card rounded-4xl p-6 border border-border relative transition-all duration-300 ease-in-out">
      <div className="gap-4 relative">
        <div className="relative transition-all duration-300 ease-in-out">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder=""
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting || !isConnected}
            className="flex-1 bg-transparent text-foreground placeholder-text-muted text-lg focus:outline-none w-full resize-none max-h-[140px] overflow-y-auto transition-all duration-300 ease-in-out disabled:opacity-50"
          />
          {!value && (
            <div className="absolute top-0 left-0 pointer-events-none text-lg text-text-muted whitespace-nowrap overflow-hidden">
              <AnimatePresence mode="wait">
                <CustomAnimate
                  key={placeholder}
                  fadeIn={true}
                  fadeOut={true}
                  direction="up"
                  duration={0.3}
                  easing={[0.4, 0, 0.2, 1]}
                  className="block"
                >
                  {placeholder}
                </CustomAnimate>
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 justify-between">
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors relative group"
              aria-label="Microphone"
              title="Microphone (U)"
            >
              <Mic className="w-5 h-5 text-text-secondary" />
              <span className="absolute -bottom-1 -right-1 text-[10px] text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                U
              </span>
            </button>
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors"
              aria-label="Link"
            >
              <Link className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              className="p-2 hover:bg-hover rounded-full transition-colors"
              aria-label="Settings"
            >
              <SlidersHorizontal className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-active transition-colors">
              <span className="text-sm text-text-tertiary">+ Lyrics</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-active transition-colors">
              <span className="text-sm text-text-tertiary">Tools</span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>
            <button
              className="p-3 bg-hover rounded-full hover:bg-active transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit"
              onClick={handleSubmit}
              disabled={!value.trim() || isSubmitting || !isConnected}
            >
              <ArrowRight
                className={`w-5 h-5 text-text-secondary ${
                  isSubmitting ? "animate-pulse" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
