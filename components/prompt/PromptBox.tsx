"use client";

import { PromptInput } from "./PromptInput";

interface PromptBoxProps {
  promptValue?: string;
  onPromptChange?: (value: string) => void;
}

export function PromptBox({ promptValue, onPromptChange }: PromptBoxProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-[2rem] font-semibold mb-8 text-center">
        What Song to Create?
      </h1>

      <div className="mb-4">
        <PromptInput value={promptValue} onChange={onPromptChange} />
      </div>
      <div className="text-white/25 text-xs font-normal mt-2.5 flex items-center justify-center gap-1 w-full">
        <span>MusicGPT v6 Pro - Our latest AI audio model</span>{" "}
        <a href="#" className="underline">
          Example prompts
        </a>
      </div>
    </div>
  );
}
