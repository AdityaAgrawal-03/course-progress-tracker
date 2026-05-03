import { describe, it, expect, beforeEach } from "vitest";
import { useProgressStore } from "./progressStore";

function resetStore() {
  useProgressStore.setState({ completedLessons: {} });
}

describe("progressStore", () => {
  beforeEach(() => {
    resetStore();
  });

  describe("toggleLesson", () => {
    it("marks a lesson as completed", () => {
      useProgressStore.getState().toggleLesson("l1");
      expect(useProgressStore.getState().completedLessons["l1"]).toBe(true);
    });

    it("unmarks a completed lesson", () => {
      useProgressStore.getState().toggleLesson("l1");
      useProgressStore.getState().toggleLesson("l1");
      expect(useProgressStore.getState().completedLessons["l1"]).toBeUndefined();
    });
  });

  describe("isCompleted", () => {
    it("returns false for incomplete lessons", () => {
      expect(useProgressStore.getState().isCompleted("l1")).toBe(false);
    });

    it("returns true for completed lessons", () => {
      useProgressStore.getState().toggleLesson("l1");
      expect(useProgressStore.getState().isCompleted("l1")).toBe(true);
    });
  });

  describe("getCourseProgress", () => {
    it("returns 0 for no completed lessons", () => {
      expect(useProgressStore.getState().getCourseProgress("cs-101")).toBe(0);
    });

    it("calculates correct percentage", () => {
      // cs-101 has 15 lessons (l1-l15)
      useProgressStore.getState().toggleLesson("l1");
      useProgressStore.getState().toggleLesson("l2");
      useProgressStore.getState().toggleLesson("l3");
      expect(useProgressStore.getState().getCourseProgress("cs-101")).toBe(20);
    });

    it("returns 0 for unknown course", () => {
      expect(useProgressStore.getState().getCourseProgress("unknown")).toBe(0);
    });
  });

  describe("getModuleProgress", () => {
    it("returns 0 for no completed lessons in module", () => {
      expect(useProgressStore.getState().getModuleProgress("cs-101", "m1")).toBe(0);
    });

    it("returns 100 when all module lessons are complete", () => {
      // m1 has lessons l1-l4
      ["l1", "l2", "l3", "l4"].forEach((id) =>
        useProgressStore.getState().toggleLesson(id)
      );
      expect(useProgressStore.getState().getModuleProgress("cs-101", "m1")).toBe(100);
    });
  });

  describe("resetCourse", () => {
    it("clears all completed lessons for a course", () => {
      useProgressStore.getState().toggleLesson("l1");
      useProgressStore.getState().toggleLesson("l2");
      useProgressStore.getState().toggleLesson("l5");
      useProgressStore.getState().resetCourse("cs-101");

      expect(useProgressStore.getState().isCompleted("l1")).toBe(false);
      expect(useProgressStore.getState().isCompleted("l2")).toBe(false);
      expect(useProgressStore.getState().isCompleted("l5")).toBe(false);
    });

    it("does not affect other courses", () => {
      useProgressStore.getState().toggleLesson("l1"); // cs-101
      useProgressStore.getState().toggleLesson("l16"); // cs-102
      useProgressStore.getState().resetCourse("cs-101");

      expect(useProgressStore.getState().isCompleted("l1")).toBe(false);
      expect(useProgressStore.getState().isCompleted("l16")).toBe(true);
    });
  });

  describe("getCompletedCount", () => {
    it("returns 0 when nothing is completed", () => {
      expect(useProgressStore.getState().getCompletedCount("cs-101")).toBe(0);
    });

    it("counts completed lessons correctly", () => {
      useProgressStore.getState().toggleLesson("l1");
      useProgressStore.getState().toggleLesson("l3");
      expect(useProgressStore.getState().getCompletedCount("cs-101")).toBe(2);
    });
  });

  describe("getTotalLessons", () => {
    it("returns correct total for cs-101", () => {
      expect(useProgressStore.getState().getTotalLessons("cs-101")).toBe(15);
    });

    it("returns 0 for unknown course", () => {
      expect(useProgressStore.getState().getTotalLessons("unknown")).toBe(0);
    });
  });

  describe("getNextIncompleteLesson", () => {
    it("returns first lesson when none are complete", () => {
      expect(useProgressStore.getState().getNextIncompleteLesson("cs-101")).toBe("l1");
    });

    it("skips completed lessons", () => {
      useProgressStore.getState().toggleLesson("l1");
      expect(useProgressStore.getState().getNextIncompleteLesson("cs-101")).toBe("l2");
    });

    it("returns null when all lessons are complete", () => {
      for (let i = 1; i <= 15; i++) {
        useProgressStore.getState().toggleLesson(`l${i}`);
      }
      expect(useProgressStore.getState().getNextIncompleteLesson("cs-101")).toBeNull();
    });
  });
});
