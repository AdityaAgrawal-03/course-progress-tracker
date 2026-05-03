export type LessonType = "video" | "article" | "quiz" | "exercise";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: DifficultyLevel;
  totalDuration: string;
  thumbnail: string;
  modules: Module[];
}
