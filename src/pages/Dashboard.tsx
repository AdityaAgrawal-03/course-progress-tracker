import { useMemo } from "react";
import { CourseCard } from "../components/CourseCard";
import { PageHeader } from "../components/layout/PageHeader";
import { courses } from "../data/curriculum";
import { useProgressStore } from "../store/progressStore";

export function Dashboard() {
  const { completedLessons } = useProgressStore();

  const stats = useMemo(() => {
    const allLessons = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons));
    const totalLessons = allLessons.length;
    const completedCount = allLessons.filter((l) => completedLessons[l.id]).length;
    const coursesCompleted = courses.filter((c) => {
      const cLessons = c.modules.flatMap((m) => m.lessons);
      return cLessons.length > 0 && cLessons.every((l) => completedLessons[l.id]);
    }).length;

    return { totalLessons, completedCount, coursesCompleted };
  }, [completedLessons]);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <PageHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
              <path
                d="M2.5 8l4 4 7-8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            CourseTrack
          </span>
        </div>

        {/* Quick stats */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-muted">
              Lessons Done
            </p>
            <p className="font-mono text-sm font-medium text-gray-200">
              {stats.completedCount}
              <span className="text-muted">/{stats.totalLessons}</span>
            </p>
          </div>
          <div className="w-px h-8 bg-surface-border" />
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-muted">
              Courses Done
            </p>
            <p className="font-mono text-sm font-medium text-gray-200">
              {stats.coursesCompleted}
              <span className="text-muted">/{courses.length}</span>
            </p>
          </div>
        </div>
      </PageHeader>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-50 mb-2">
            Your Learning Path
          </h1>
          <p className="text-muted text-base max-w-lg">
            Track your progress across courses. Pick up where you left off, or
            start something new.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border mt-20">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-xs text-muted">
            Built with React, TypeScript & Zustand
          </p>
          <p className="text-xs text-muted font-mono">v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}
