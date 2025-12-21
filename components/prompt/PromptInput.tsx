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
import { useTooltip } from "@/hooks/useTooltip";
import { useGenerateMusicAPI } from "@/hooks/useGenerateMusicAPI";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const { tooltip } = useTooltip();
  const isMobile = useIsMobile();
  const [internalValue, setInternalValue] = useState("");
  const [placeholder, setPlaceholder] = useState(
    externalPlaceholder ?? getRandomPlaceholder()
  );
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
  const { generateMusic, isSubmitting } = useGenerateMusicAPI();

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

    const generation = await generateMusic(promptText);

    if (generation) {
      addGeneration(generation);
      startGeneration(generation.id, promptText);

      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
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

  useEffect(() => {
    const attachTooltip = tooltip("#attach-file-button", {
      content: "Attach file",
      arrow: true,
      animation: "fade",
      placement: "left",
    });

    const instrumentalTooltip = tooltip("#instrumental-button", {
      content: "Instrumental mode",
      arrow: true,
      animation: "fade",
      placement: "bottom",
    });

    const controlTooltip = tooltip("#control-button", {
      content: "Control options",
      arrow: true,
      animation: "fade",
      placement: "bottom",
    });

    return () => {
      if (Array.isArray(attachTooltip)) {
        attachTooltip.forEach((t) => t.destroy());
      }
      if (Array.isArray(instrumentalTooltip)) {
        instrumentalTooltip.forEach((t) => t.destroy());
      }
      if (Array.isArray(controlTooltip)) {
        controlTooltip.forEach((t) => t.destroy());
      }
    };
  }, [tooltip]);

  return (
    <div
      className={`prompt-input-container rounded-4xl relative transition-all duration-300 ease-in-out ${
        showAnimation ? "generating" : ""
      }`}
    >
      <div className="bg-prompt-input-background rounded-4xl p-6 flex flex-col gap-4 relative z-1">
        <div className="relative transition-all duration-300 ease-in-out ">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder=""
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting || !isConnected}
            className="flex-1 bg-transparent text-foreground placeholder-text-muted text-lg focus:outline-none w-full resize-none max-h-35 overflow-y-auto transition-all duration-300 ease-in-out disabled:opacity-50"
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
        <div className="flex items-center   ">
          <div className="flex items-center gap-2 justify-between">
            <button
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer"
              id="attach-file-button"
            >
              <Image
                src={AttachFileIcon}
                alt="Attach file"
                width={18}
                height={18}
              />
            </button>
            <button
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer"
              id="control-button"
            >
              <Image
                src={ControlIcon}
                alt="Control options"
                width={18}
                height={18}
              />
            </button>
            <button
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative group border border-border cursor-pointer"
              id="instrumental-button"
            >
              <Image
                src={InstrumentalIcon}
                alt="Instrumental mode"
                width={18}
                height={18}
              />
            </button>
            {!isMobile && (
              <button className="flex items-center gap-2 p-2.5 bg-prompt-input-background rounded-full hover:bg-white/10  border border-border transition-colors cursor-pointer">
                <span className="text-sm text-text-tertiary">+ Lyrics</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto  ">
            <button className="border-flow flex items-center gap-2 p-2.5 bg-prompt-input-background rounded-full hover:bg-white/10 transition-colors cursor-pointer relative ">
              <span className="text-sm text-text-tertiary relative z-10">
                Tools
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary relative z-10" />
            </button>

            <button
              className="p-2.5 bg-hover rounded-full hover:bg-white/10  transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-border cursor-pointer border border-border"
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
