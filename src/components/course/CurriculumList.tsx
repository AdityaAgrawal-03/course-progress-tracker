import { useMemo } from "react";
import { useProgressStore } from "../../store/progressStore";
import { useCourseProgress } from "../../hooks/useProgress";
import { CompletionBanner } from "../CompletionBanner";
import { ModuleSection } from "../ModuleSection";
import type { Course } from "../../types";

interface CurriculumListProps {
  course: Course;
}

export function CurriculumList({ course }: CurriculumListProps) {
  const { completedLessons } = useProgressStore();
  const { isComplete } = useCourseProgress(course.id);

  const firstIncompleteModuleId = useMemo(() => {
    for (const mod of course.modules) {
      if (mod.lessons.some((lesson) => !completedLessons[lesson.id])) {
        return mod.id;
      }
    }
    return null;
  }, [course, completedLessons]);

  return (
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
  );
}
