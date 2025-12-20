import {
  Paperclip,
  Settings,
  Radio,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export function PromptControls() {
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="flex items-center gap-4">
        <button
          className="p-2 hover:bg-hover rounded-lg transition-colors "
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5 text-text-secondary" />
        </button>
        <button
          className="p-2 hover:bg-hover rounded-lg transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-text-secondary" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-active transition-colors">
          <Radio className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-tertiary">Instrumental</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-active transition-colors">
          <span className="text-sm text-text-tertiary">+ Lyrics</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-hover rounded-full hover:bg-active transition-colors">
          <span className="text-sm text-text-tertiary">Tools</span>
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        </button>
        <button
          className="p-3 bg-hover rounded-full hover:bg-active transition-colors"
          aria-label="Submit"
        >
          <ArrowRight className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
