"use client";

import { PromptInput } from "./PromptInput";
import { PromptActions } from "./PromptActions";

interface PromptBoxProps {
  promptValue?: string;
  onPromptChange?: (value: string) => void;
}

export function PromptBox({ promptValue, onPromptChange }: PromptBoxProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-34">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        What Song to Create?
      </h1>

      <div className="mb-4">
        <PromptInput value={promptValue} onChange={onPromptChange} />
      </div>

      <PromptActions />
    </div>
  );
}
