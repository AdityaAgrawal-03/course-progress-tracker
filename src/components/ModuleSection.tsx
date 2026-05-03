import { useState } from "react";
import { useProgressStore } from "../store/progressStore";
import { LessonItem } from "./LessonItem";
import { ProgressBar } from "./ui/ProgressBar";
import type { Module } from "../types";

interface ModuleSectionProps {
  module: Module;
  courseId: string;
  defaultOpen?: boolean;
  index: number;
}

export function ModuleSection({
  module,
  courseId,
  defaultOpen = false,
  index,
}: ModuleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { getModuleProgress, completedLessons } = useProgressStore();
  const progress = getModuleProgress(courseId, module.id);
  const completedCount = module.lessons.filter(
    (l) => completedLessons[l.id]
  ).length;

  return (
    <div
      className="border border-surface-border rounded-xl overflow-hidden bg-surface-raised/50 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Module header — toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-surface-hover/50 transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400"
        aria-expanded={isOpen}
        aria-label={`${module.title} — ${completedCount} of ${module.lessons.length} lessons complete`}
      >
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-90" : ""
          }`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Module title */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-100 truncate">
            {module.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <ProgressBar value={progress} size="sm" className="flex-1 max-w-[120px]" />
            <span className="text-[11px] font-mono text-muted">
              {completedCount}/{module.lessons.length}
            </span>
          </div>
        </div>

        {/* Completion badge */}
        {progress === 100 && (
          <span className="flex-shrink-0 text-xs font-medium text-success bg-success-glow px-2.5 py-1 rounded-full border border-success/20">
            Complete
          </span>
        )}
      </button>

      {/* Lessons list */}
      {isOpen && (
        <div className="px-3 pb-3 space-y-0.5 border-t border-surface-border/50">
          <div className="pt-2">
            {module.lessons.map((lesson, idx) => (
              <LessonItem key={lesson.id} lesson={lesson} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
