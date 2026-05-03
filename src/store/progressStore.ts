import { create } from "zustand";
import { persist } from "zustand/middleware";
import { courses } from "../data/curriculum";

interface ProgressState {
  completedLessons: Record<string, boolean>;
  toggleLesson: (lessonId: string) => void;
  resetCourse: (courseId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  getModuleProgress: (courseId: string, moduleId: string) => number;
  getCompletedCount: (courseId: string) => number;
  getTotalLessons: (courseId: string) => number;
  getNextIncompleteLesson: (courseId: string) => string | null;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},

      toggleLesson: (lessonId: string) => {
        set((state) => {
          const updated = { ...state.completedLessons };
          if (updated[lessonId]) {
            delete updated[lessonId];
          } else {
            updated[lessonId] = true;
          }
          return { completedLessons: updated };
        });
      },

      resetCourse: (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        set((state) => {
          const updated = { ...state.completedLessons };
          course.modules.forEach((mod) => {
            mod.lessons.forEach((lesson) => {
              delete updated[lesson.id];
            });
          });
          return { completedLessons: updated };
        });
      },

      isCompleted: (lessonId: string) => {
        return !!get().completedLessons[lessonId];
      },

      getCourseProgress: (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return 0;

        const allLessons = course.modules.flatMap((m) => m.lessons);
        if (allLessons.length === 0) return 0;

        const completed = allLessons.filter(
          (l) => get().completedLessons[l.id]
        ).length;

        return Math.round((completed / allLessons.length) * 100);
      },

      getModuleProgress: (courseId: string, moduleId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return 0;

        const mod = course.modules.find((m) => m.id === moduleId);
        if (!mod || mod.lessons.length === 0) return 0;

        const completed = mod.lessons.filter(
          (l) => get().completedLessons[l.id]
        ).length;

        return Math.round((completed / mod.lessons.length) * 100);
      },

      getCompletedCount: (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return 0;

        return course.modules
          .flatMap((m) => m.lessons)
          .filter((l) => get().completedLessons[l.id]).length;
      },

      getTotalLessons: (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return 0;
        return course.modules.flatMap((m) => m.lessons).length;
      },

      getNextIncompleteLesson: (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return null;

        for (const mod of course.modules) {
          for (const lesson of mod.lessons) {
            if (!get().completedLessons[lesson.id]) {
              return lesson.id;
            }
          }
        }
        return null;
      },
    }),
    {
      name: "course-progress-storage",
    }
  )
);
