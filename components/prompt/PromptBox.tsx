"use client";

import { PromptInput } from "./PromptInput";

interface PromptBoxProps {
  promptValue?: string;
  onPromptChange?: (value: string) => void;
}

export function PromptBox({ promptValue, onPromptChange }: PromptBoxProps) {
  return (
    <div className="w-full max-w-4xl mx-auto ">
      <h1 className="text-[2rem] font-semibold mb-8 text-center">
        What Song to Create?
      </h1>

      <div className="mb-4">
        <PromptInput value={promptValue} onChange={onPromptChange} />
      </div>
    </div>
  );
}
