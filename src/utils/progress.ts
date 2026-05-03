import type { LessonType, DifficultyLevel } from "../types";

export const lessonTypeConfig: Record<
  LessonType,
  { icon: string; label: string; color: string }
> = {
  video: { icon: "🎥", label: "Video", color: "text-blue-400" },
  article: { icon: "📄", label: "Article", color: "text-amber-400" },
  quiz: { icon: "🧠", label: "Quiz", color: "text-purple-400" },
  exercise: { icon: "💻", label: "Exercise", color: "text-emerald-400" },
};

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

export function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function formatRemainingTime(
  totalMinutes: number,
  completedMinutes: number
): string {
  const remaining = Math.max(0, totalMinutes - completedMinutes);
  if (remaining >= 60) {
    const hours = Math.floor(remaining / 60);
    const mins = remaining % 60;
    return mins > 0 ? `${hours}h ${mins}m remaining` : `${hours}h remaining`;
  }
  return `${remaining}m remaining`;
}
