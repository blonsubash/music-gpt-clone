"use client";

import { useGenerationStore } from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import { GenerationItem } from "./GenerationItem";
import { GenerationItemSkeleton } from "./GenerationItemSkeleton";
import { useEffect, useRef, useState, useMemo } from "react";

const ITEMS_PER_PAGE = 6;
const LOADING_DELAY = 3000;

export function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const actualDisplayedCount = useMemo(() => {
    if (generations.length <= ITEMS_PER_PAGE) {
      return ITEMS_PER_PAGE;
    }
    return displayedCount;
  }, [generations.length, displayedCount]);

  const hasMoreItems = actualDisplayedCount < generations.length;

  useEffect(() => {
    if (!hasMoreItems || isLoadingMore) return;

    const currentLoaderRef = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMoreItems && !isLoadingMore) {
          setIsLoadingMore(true);

          setTimeout(() => {
            setDisplayedCount((prev) =>
              Math.min(prev + ITEMS_PER_PAGE, generations.length)
            );
            setIsLoadingMore(false);
          }, LOADING_DELAY);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMoreItems, isLoadingMore, generations.length]);

  if (generations.length === 0) {
    return null;
  }

  const displayedGenerations = generations.slice(0, actualDisplayedCount);
  const skeletonCount = Math.min(
    ITEMS_PER_PAGE,
    generations.length - actualDisplayedCount
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 ">
      <h2 className="text-lg font-semibold text-profile-menu-text mb-4">
        Recent generations
      </h2>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {displayedGenerations.map((generation, index) => (
            <GenerationItem
              key={generation.id}
              generation={generation}
              index={index}
              variant="default"
            />
          ))}
        </AnimatePresence>

        {isLoadingMore && (
          <div className="space-y-3">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <GenerationItemSkeleton
                key={`skeleton-${index}`}
                index={index}
                variant="default"
              />
            ))}
          </div>
        )}

        {hasMoreItems && <div ref={loaderRef} className="h-4" />}
      </div>
    </div>
  );
}
