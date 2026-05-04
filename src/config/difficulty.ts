import type { DifficultyLevel } from "../types";

export const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; color: string; bg: string }
> = {
  beginner: {
    label: "Beginner",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  intermediate: {
    label: "Intermediate",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  advanced: {
    label: "Advanced",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
};
