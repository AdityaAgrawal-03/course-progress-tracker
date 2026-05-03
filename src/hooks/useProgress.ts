import { useMemo } from "react";
import { useProgressStore } from "../store/progressStore";
import { courses } from "../data/curriculum";
import { parseDuration, formatRemainingTime } from "../utils/progress";

export function useCourseProgress(courseId: string) {
  const { completedLessons, getCourseProgress, getCompletedCount, getTotalLessons } =
    useProgressStore();

  return useMemo(() => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return {
        progress: 0,
        completedCount: 0,
        totalLessons: 0,
        totalMinutes: 0,
        completedMinutes: 0,
        remainingTimeLabel: "0m remaining",
        isComplete: false,
      };
    }

    const allLessons = course.modules.flatMap((m) => m.lessons);
    const totalMinutes = allLessons.reduce(
      (sum, l) => sum + parseDuration(l.duration),
      0
    );
    const completedMinutes = allLessons
      .filter((l) => completedLessons[l.id])
      .reduce((sum, l) => sum + parseDuration(l.duration), 0);

    const progress = getCourseProgress(courseId);
    const completedCount = getCompletedCount(courseId);
    const totalCount = getTotalLessons(courseId);

    return {
      progress,
      completedCount,
      totalLessons: totalCount,
      totalMinutes,
      completedMinutes,
      remainingTimeLabel: formatRemainingTime(totalMinutes, completedMinutes),
      isComplete: progress === 100,
    };
  }, [courseId, completedLessons, getCourseProgress, getCompletedCount, getTotalLessons]);
}
