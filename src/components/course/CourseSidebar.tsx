import { useMemo } from "react";
import { useProgressStore } from "../../store/progressStore";
import { useCourseProgress } from "../../hooks/useProgress";
import { ProgressRing } from "../ProgressRing";
import { Badge } from "../ui/Badge";
import { difficultyConfig, lessonTypeConfig } from "../../config";
import type { Course, LessonType } from "../../types";

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const { resetCourse } = useProgressStore();
  const { progress, completedCount, remainingTimeLabel, isComplete } =
    useCourseProgress(course.id);

  const difficulty = difficultyConfig[course.difficulty];

  const typeCounts = useMemo(() => {
    const counts: Partial<Record<LessonType, number>> = {};
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        counts[lesson.type] = (counts[lesson.type] ?? 0) + 1;
      });
    });
    return counts;
  }, [course]);

  return (
    <aside className="lg:w-72 flex-shrink-0 animate-fade-in">
      <div className="lg:sticky lg:top-20 space-y-6">
        {/* Progress ring card */}
        <div className="rounded-2xl border border-surface-border bg-surface-raised p-6 text-center">
          <div className="flex justify-center mb-4">
            <ProgressRing value={progress} size={130} />
          </div>
          <p className="text-xs text-muted font-mono">
            {isComplete ? "All lessons completed!" : remainingTimeLabel}
          </p>
        </div>

        {/* Course info card */}
        <div className="rounded-2xl border border-surface-border bg-surface-raised p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{course.thumbnail}</span>
            <div>
              <h2 className="text-sm font-display font-semibold text-gray-100">
                {course.title}
              </h2>
              <p className="text-xs text-muted">{course.instructor}</p>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={difficulty.bg}>
              <span className={difficulty.color}>{difficulty.label}</span>
            </Badge>
            <Badge className="bg-surface-overlay border-surface-border">
              <span className="text-muted font-mono">
                {course.totalDuration}
              </span>
            </Badge>
          </div>

          {/* Lesson type breakdown */}
          <div className="pt-3 border-t border-surface-border/50 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-muted mb-2">
              Content Types
            </p>
            {(Object.entries(typeCounts) as [LessonType, number][]).map(
              ([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="text-xs">
                    {lessonTypeConfig[type].icon}
                  </span>
                  <span className="text-xs text-muted flex-1">
                    {lessonTypeConfig[type].label}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {count}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Reset button */}
        {completedCount > 0 && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Reset all progress for this course? This cannot be undone."
                )
              ) {
                resetCourse(course.id);
              }
            }}
            aria-label={`Reset all progress for ${course.title}`}
            className="w-full text-xs text-muted hover:text-rose-400 py-2 rounded-lg border border-surface-border hover:border-rose-400/30 transition-colors text-center"
          >
            Reset Progress
          </button>
        )}
      </div>
    </aside>
  );
}
