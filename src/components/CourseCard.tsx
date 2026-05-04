import { Link } from "react-router-dom";
import { useCourseProgress } from "../hooks/useProgress";
import { ProgressBar } from "./ui/ProgressBar";
import { Badge } from "./ui/Badge";
import { difficultyConfig } from "../config";
import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const { progress, completedCount, totalLessons, remainingTimeLabel, isComplete } =
    useCourseProgress(course.id);

  const difficulty = difficultyConfig[course.difficulty];

  return (
    <Link
      to={`/course/${course.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden
        ${
          isComplete
            ? "border-success/20 bg-success-glow"
            : "border-surface-border bg-surface-raised hover:border-accent/30 hover:bg-surface-raised"
        }
        hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5`}
      >
        {/* Top accent line */}
        <div
          className={`h-1 w-full ${
            isComplete
              ? "bg-gradient-to-r from-success-dim to-success"
              : "bg-gradient-to-r from-accent-dim to-accent"
          }`}
        />

        <div className="p-5">
          {/* Thumbnail + Difficulty */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-3xl">{course.thumbnail}</span>
            <Badge className={difficulty.bg}>
              <span className={difficulty.color}>{difficulty.label}</span>
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-base font-display font-semibold text-gray-100 mb-1.5 group-hover:text-accent transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-muted mb-4">
            <span>{course.instructor}</span>
            <span className="text-surface-border">·</span>
            <span className="font-mono">{course.totalDuration}</span>
            <span className="text-surface-border">·</span>
            <span className="font-mono">{totalLessons} lessons</span>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <ProgressBar value={progress} size="sm" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted">
                {completedCount}/{totalLessons} completed
              </span>
              <span className="text-[11px] font-mono text-muted">
                {isComplete ? "✓ Finished" : remainingTimeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 py-3 border-t border-surface-border/50 bg-surface/50">
          <span
            className={`text-xs font-medium ${
              isComplete ? "text-success" : "text-accent"
            } group-hover:underline`}
          >
            {isComplete
              ? "Review Course →"
              : progress > 0
              ? "Continue Learning →"
              : "Start Course →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
