import { useProgressStore } from "../store/progressStore";
import { lessonTypeConfig } from "../utils/progress";
import type { Lesson } from "../types";

interface LessonItemProps {
  lesson: Lesson;
  index: number;
}

export function LessonItem({ lesson, index }: LessonItemProps) {
  const { toggleLesson, isCompleted } = useProgressStore();
  const completed = isCompleted(lesson.id);
  const typeConfig = lessonTypeConfig[lesson.type];

  const handleToggle = () => {
    toggleLesson(lesson.id);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 text-left
        ${
          completed
            ? "bg-success-glow border border-success/10"
            : "hover:bg-surface-hover border border-transparent hover:border-surface-border"
        }`}
      style={{ animationDelay: `${index * 50}ms` }}
      aria-label={`${completed ? "Unmark" : "Mark"} "${lesson.title}" as complete`}
    >
      {/* Checkbox */}
      <div
        className={`relative flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
          ${
            completed
              ? "bg-success border-success"
              : "border-surface-border group-hover:border-muted"
          }`}
      >
        {completed && (
          <svg
            className="w-3 h-3 text-[#0c0c0c] animate-scale-in"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Lesson type icon */}
      <span className="text-sm flex-shrink-0" title={typeConfig.label}>
        {typeConfig.icon}
      </span>

      {/* Title */}
      <span
        className={`flex-1 text-sm transition-colors duration-200 ${
          completed ? "text-muted line-through decoration-muted/40" : "text-gray-200"
        }`}
      >
        {lesson.title}
      </span>

      {/* Type label */}
      <span
        className={`hidden sm:inline text-[11px] font-mono uppercase tracking-wider ${typeConfig.color} opacity-60`}
      >
        {typeConfig.label}
      </span>

      {/* Duration */}
      <span className="text-xs font-mono text-muted flex-shrink-0">
        {lesson.duration}
      </span>
    </button>
  );
}
