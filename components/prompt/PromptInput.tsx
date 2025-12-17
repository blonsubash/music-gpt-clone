"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { CustomAnimate } from "@/components/ui/Animate";
import { getRandomPlaceholder } from "@/lib/placeholderUtils";
import { useSocketContext } from "@/components/providers/SocketProvider";
import { useGenerationStore } from "@/lib/store";
import {
  AttachFileIcon,
  ControlIcon,
  InstrumentalIcon,
} from "@/app/assets/icons";
import Image from "next/image";

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
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] =
    useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { startGeneration, isConnected } = useSocketContext();
  const {
    addGeneration,
    generations,
    setInvalidPrompt,
    setInsufficientCredit,
    setFailedGeneration,
    setIsProfileMenuOpen,
  } = useGenerationStore();

  const value = controlledValue ?? internalValue;
  const isGenerating = generations.some((gen) => gen.status === "generating");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPlayedInitialAnimation(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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

    if (promptText.toLowerCase().includes("invalid")) {
      setInvalidPrompt(promptText);
      setIsProfileMenuOpen(true);
      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
      return;
    }

    if (
      promptText.toLowerCase().includes("credit") ||
      promptText.toLowerCase().includes("insufficient")
    ) {
      setInsufficientCredit(true);
      setIsProfileMenuOpen(true);
      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
      return;
    }

    if (promptText.toLowerCase().includes("failed")) {
      const failedGeneration = {
        id: `gen-${Date.now()}`,
        prompt: promptText,
        title: "Failed Generation",
        status: "generating" as const,
        progress: 0,
        createdAt: new Date(),
      };

      addGeneration(failedGeneration);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 50) {
          useGenerationStore.getState().updateGeneration(failedGeneration.id, {
            progress,
          });
        } else {
          clearInterval(interval);
          const updatedFailedGen = {
            ...failedGeneration,
            status: "failed" as const,
            progress: 50,
            error: "Generation failed due to an error",
          };
          useGenerationStore.getState().updateGeneration(failedGeneration.id, {
            status: "failed",
            progress: 50,
            error: "Generation failed due to an error",
          });
          setFailedGeneration(updatedFailedGen);
          setIsProfileMenuOpen(true);
        }
      }, 200);

      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
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
      startGeneration(generation.id, promptText);

      if (onChange) {
        onChange("");
      } else {
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

  const showAnimation =
    !hasPlayedInitialAnimation || isSubmitting || isGenerating;

  return (
    <div
      className={`prompt-input-container rounded-4xl relative transition-all duration-300 ease-in-out ${
        showAnimation ? "generating" : ""
      }`}
    >
      <div className="bg-card rounded-4xl p-6 flex flex-col gap-4 relative z-[1]">
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
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer">
              <Image
                src={AttachFileIcon}
                alt="Attach file"
                width={20}
                height={20}
              />
            </button>
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer">
              <Image
                src={ControlIcon}
                alt="Attach file"
                width={20}
                height={20}
              />
            </button>
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer">
              <Image
                src={InstrumentalIcon}
                alt="Attach file"
                width={20}
                height={20}
              />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-white/10  border border-border transition-colors cursor-pointer">
              <span className="text-sm text-text-tertiary">+ Lyrics</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto  ">
            <button className="border-flow flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-white/10 transition-colors cursor-pointer relative ">
              <span className="text-sm text-text-tertiary relative z-10">
                Tools
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary relative z-10" />
            </button>

            <button
              className="p-3 bg-hover rounded-full hover:bg-white/10  transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-border"
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
