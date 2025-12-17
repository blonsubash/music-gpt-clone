"use client";

import { ReactNode, HTMLAttributes } from "react";
import { motion, Variants, Transition, Easing } from "framer-motion";
import { cn } from "@/lib/utils";

export type FadeDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "center"
  | "none";

export interface AnimateProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | "children"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  children: ReactNode;
  fadeIn?: boolean;
  fadeOut?: boolean;
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  easing?: Easing | Easing[];
  className?: string;
  trigger?: "mount" | "hover" | "inView";
  stagger?: number;
  staggerChildren?: boolean;
  once?: boolean; // For inView trigger - animate only once
  distance?: number; // Distance for directional animations
}

const getDirectionVariants = (
  direction: FadeDirection,
  distance: number
): { x?: number; y?: number; scale?: number } => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "center":
      return { x: 0, y: 0, scale: 0.8 };
    case "none":
    default:
      return {};
  }
};

export const createVariants = (
  fadeIn: boolean,
  fadeOut: boolean,
  direction: FadeDirection,
  distance: number
): Variants => {
  const dirVars = getDirectionVariants(direction, distance);
  const opacity = fadeIn || fadeOut ? 0 : 1;

  return {
    hidden: {
      opacity: fadeIn ? opacity : 1,
      ...dirVars,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: direction === "center" ? 1 : undefined,
    },
    exit: fadeOut
      ? {
          opacity: 0,
          ...getDirectionVariants(direction, distance),
          scale: direction === "center" ? 0.8 : undefined,
        }
      : {},
  };
};

export function CustomAnimate({
  children,
  fadeIn = true,
  fadeOut = false,
  direction = "up",
  duration = 0.5,
  delay = 0,
  easing = [0.4, 0, 0.2, 1],
  className,
  trigger = "mount",
  stagger,
  staggerChildren = false,
  once = true,
  distance = 20,
  ...htmlProps
}: AnimateProps) {
  const variants = createVariants(fadeIn, fadeOut, direction, distance);

  const transition: Transition = {
    duration,
    delay,
    ease: easing,
  };

  // Stagger configuration for children
  // Note: For stagger to work, children should be motion components or use Animate wrapper
  const containerVariants: Variants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger ?? 0.1,
            delayChildren: delay,
          },
        },
      }
    : {};

  // Mount trigger - animate on component mount
  if (trigger === "mount") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit={fadeOut ? "exit" : undefined}
        variants={staggerChildren ? containerVariants : variants}
        transition={transition}
        className={cn(className)}
        {...htmlProps}
      >
        {children}
      </motion.div>
    );
  }

  // Hover trigger - subtle scale effect on hover
  if (trigger === "hover") {
    return (
      <motion.div
        initial="visible"
        whileHover={{ scale: 1.05 }}
        transition={transition}
        className={cn(className)}
        {...htmlProps}
      >
        {children}
      </motion.div>
    );
  }

  // InView trigger - animate when element enters viewport
  if (trigger === "inView") {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        exit={fadeOut ? "exit" : undefined}
        variants={staggerChildren ? containerVariants : variants}
        transition={transition}
        className={cn(className)}
        {...htmlProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(className)} {...htmlProps}>
      {children}
    </div>
  );
}
