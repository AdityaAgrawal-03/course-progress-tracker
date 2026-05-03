import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "../data/curriculum";
import { useProgressStore } from "../store/progressStore";
import { useCourseProgress } from "../hooks/useProgress";
import { ProgressRing } from "../components/ProgressRing";
import { ModuleSection } from "../components/ModuleSection";
import { CompletionBanner } from "../components/CompletionBanner";
import { CompletionPopover } from "../components/CompletionPopover";
import { Badge } from "../components/ui/Badge";
import { difficultyConfig, lessonTypeConfig } from "../utils/progress";
import type { LessonType } from "../types";

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find((c) => c.id === courseId);
  const { resetCourse, completedLessons } = useProgressStore();
  const {
    progress,
    completedCount,
    totalLessons,
    remainingTimeLabel,
    isComplete,
  } = useCourseProgress(courseId ?? "");

  const [showPopover, setShowPopover] = useState(false);
  const wasComplete = useRef(isComplete);

  useEffect(() => {
    if (isComplete && !wasComplete.current) {
      setShowPopover(true);
    }
    wasComplete.current = isComplete;
  }, [isComplete]);

  const handleClosePopover = useCallback(() => setShowPopover(false), []);

  const typeCounts = useMemo(() => {
    if (!course) return {};

    const counts: Partial<Record<LessonType, number>> = {};
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        counts[lesson.type] = (counts[lesson.type] ?? 0) + 1;
      });
    });
    return counts;
  }, [course]);

  // Find first module with incomplete lessons to auto-expand
  const firstIncompleteModuleId = useMemo(() => {
    if (!course) return null;

    for (const mod of course.modules) {
      if (mod.lessons.some((lesson) => !completedLessons[lesson.id])) {
        return mod.id;
      }
    }

    return null;
  }, [course, completedLessons]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-bold text-gray-100 mb-2">
            Course Not Found
          </h2>
          <Link to="/" className="text-accent text-sm hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const difficulty = difficultyConfig[course.difficulty];

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Sticky header */}
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Back to all courses"
              className="flex items-center gap-2 text-muted hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">
                All Courses
              </span>
            </Link>
            <div className="w-px h-5 bg-surface-border hidden sm:block" />
            <h1 className="text-sm font-medium text-gray-200 truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </h1>
          </div>

          {/* Header progress */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted hidden sm:inline">
              {completedCount}/{totalLessons}
            </span>
            <div className="w-24 h-1.5 rounded-full bg-surface-overlay overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete
                    ? "bg-gradient-to-r from-success-dim to-success"
                    : "bg-gradient-to-r from-accent-dim to-accent"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-medium text-gray-300">
              {progress}%
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
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

          {/* Modules content */}
          <div className="flex-1 min-w-0 space-y-4">
            {isComplete && <CompletionBanner courseName={course.title} />}

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-display font-bold text-gray-100">
                Curriculum
              </h2>
              <span className="text-xs font-mono text-muted">
                {course.modules.length} modules
              </span>
            </div>

            {course.modules.map((mod, idx) => (
              <ModuleSection
                key={mod.id}
                module={mod}
                courseId={course.id}
                index={idx}
                defaultOpen={mod.id === firstIncompleteModuleId}
              />
            ))}
          </div>
        </div>
      </main>

      <CompletionPopover
        courseName={course.title}
        show={showPopover}
        onClose={handleClosePopover}
      />
    </div>
  );
}
