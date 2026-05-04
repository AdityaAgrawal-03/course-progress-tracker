import type { LessonType } from "../types";

export const lessonTypeConfig: Record<
  LessonType,
  { icon: string; label: string; color: string }
> = {
  video: { icon: "🎥", label: "Video", color: "text-blue-400" },
  article: { icon: "📄", label: "Article", color: "text-amber-400" },
  quiz: { icon: "🧠", label: "Quiz", color: "text-purple-400" },
  exercise: { icon: "💻", label: "Exercise", color: "text-emerald-400" },
};
