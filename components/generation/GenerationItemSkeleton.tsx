"use client";

import { motion } from "framer-motion";

interface GenerationItemSkeletonProps {
  index?: number;
  variant?: "default" | "compact";
}

export function GenerationItemSkeleton({
  index = 0,
  variant = "default",
}: GenerationItemSkeletonProps) {
  const containerClasses = {
    default: "rounded-2xl",
    compact: "rounded-xl",
  };

  const innerContainerClasses = {
    default: "px-2 py-2.5 h-20",
    compact: "p-2 h-16",
  };

  const thumbnailContainerClasses = {
    default: "w-15 h-15 rounded-2xl",
    compact: "w-12 h-12 rounded-lg",
  };

  const titleClasses = {
    default: "h-4 mb-1",
    compact: "h-3.5 mb-0.5",
  };

  const promptClasses = {
    default: "h-3.5",
    compact: "h-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`relative overflow-hidden ${containerClasses[variant]}`}
    >
      <div
        className={`flex items-center ${
          variant === "default" ? "gap-4" : "gap-3"
        } ${innerContainerClasses[variant]} relative`}
      >
        <div
          className={`relative shrink-0 p-px ${thumbnailContainerClasses[variant]}`}
        >
          <div
            className={`relative w-full h-full overflow-hidden ${thumbnailContainerClasses[variant]} bg-[#2a2a2a] animate-pulse`}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className={`${titleClasses[variant]}`}>
            <div
              className={`bg-border-100 rounded-md ${
                variant === "default" ? "w-32" : "w-24"
              } h-full animate-pulse relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          </div>

          <div className="relative">
            <div
              className={`bg-border-100 rounded-md ${
                variant === "default" ? "w-64" : "w-48"
              } ${
                promptClasses[variant]
              } animate-pulse relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
