"use client";

import {
  AlertTriangle,
  Copy,
  Play,
  ThumbsUp,
  ThumbsDown,
  Download,
  MoreVertical,
} from "lucide-react";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  if (!isOpen) return null;

  const musicItems = [
    {
      id: 1,
      title: "Out in the street",
      description: 'Christmas song with the title "Mo..."',
      version: "v1",
      hasPlayIcon: false,
    },
    {
      id: 2,
      title: "I bet my life",
      description: "Christmas...",
      version: "v1",
      hasPlayIcon: true,
      hasActions: true,
    },
    {
      id: 3,
      title: "Good Morning in the rain of nove...",
      description: 'Christmas song with the title "Mo..."',
      version: "v1",
      hasPlayIcon: false,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div className="absolute right-0 top-12 z-50 w-96 bg-card rounded-lg border border-border shadow-xl overflow-hidden">
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          {/* Server Status Alert */}
          <div className="bg-[#7c2d12] rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">
                Oops! Server busy.
              </p>
              <p className="text-white text-sm mt-1">
                4.9K users in the queue.{" "}
                <button className="underline hover:no-underline">Retry</button>
              </p>
            </div>
          </div>

          {/* Invalid Prompt Error */}
          <div className="bg-card rounded-lg p-4 border border-border flex gap-4">
            <div className="w-12 h-12 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">😢</span>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Invalid Prompt
                </h3>
                <p className="text-text-muted text-xs mt-1">
                  This is not good prompt, throw invalid pr..
                </p>
              </div>
              <p className="text-text-secondary text-sm">
                Your prompt does not seem to be valid. Please provide a prompt
                related to song creation, remixing, covers, or similar music
                tasks.
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-hover transition-colors text-foreground">
                  Retry
                </button>
                <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-hover transition-colors text-foreground flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy prompt
                </button>
              </div>
            </div>
          </div>

          {/* Music Items List */}
          <div className="space-y-3">
            {musicItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-2 rounded-lg hover:bg-hover transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                  {item.hasPlayIcon && (
                    <Play className="w-6 h-6 text-white fill-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-xs mt-1 truncate">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.hasActions && (
                    <>
                      <button
                        className="p-1.5 hover:bg-active rounded transition-colors"
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-4 h-4 text-text-secondary fill-text-secondary" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-active rounded transition-colors"
                        aria-label="Dislike"
                      >
                        <ThumbsDown className="w-4 h-4 text-text-secondary" />
                      </button>
                    </>
                  )}
                  <span className="px-2 py-0.5 bg-hover rounded text-xs text-text-secondary">
                    {item.version}
                  </span>
                  {item.hasActions && (
                    <>
                      <button
                        className="p-1.5 hover:bg-active rounded transition-colors"
                        aria-label="Download"
                      >
                        <Download className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-active rounded transition-colors"
                        aria-label="More options"
                      >
                        <MoreVertical className="w-4 h-4 text-text-secondary" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Placeholder */}
            <div className="flex gap-3 p-2">
              <div className="w-16 h-16 bg-hover rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-hover rounded w-3/4" />
                <div className="h-3 bg-hover rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
