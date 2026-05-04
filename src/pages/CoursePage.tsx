import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "../data/curriculum";
import { useCourseProgress } from "../hooks/useProgress";
import { PageHeader } from "../components/layout/PageHeader";
import { CourseNotFound } from "../components/course/CourseNotFound";
import { CourseSidebar } from "../components/course/CourseSidebar";
import { CurriculumList } from "../components/course/CurriculumList";
import { CompletionPopover } from "../components/CompletionPopover";

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find((c) => c.id === courseId);
  const { progress, completedCount, totalLessons, isComplete } =
    useCourseProgress(courseId ?? "");

  const [showPopover, setShowPopover] = useState(false);
  const wasComplete = useRef(isComplete);

  useEffect(() => {
    if (isComplete && !wasComplete.current) {
      setShowPopover(true);
    }
    wasComplete.current = isComplete;
  }, [isComplete]);

  const handleClosePopover = useCallback(() => setShowPopover(false), []);

  if (!course) return <CourseNotFound />;

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Sticky header */}
      <PageHeader compact>
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
      </PageHeader>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CourseSidebar course={course} />
          <CurriculumList course={course} />
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
