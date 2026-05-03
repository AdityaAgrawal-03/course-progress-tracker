import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonItem } from "./LessonItem";
import { useProgressStore } from "../store/progressStore";
import type { Lesson } from "../types";

const mockLesson: Lesson = {
  id: "l1",
  title: "Introduction to HTML",
  duration: "8 min",
  type: "video",
};

describe("LessonItem", () => {
  beforeEach(() => {
    useProgressStore.setState({ completedLessons: {} });
  });

  it("renders lesson title and duration", () => {
    render(<LessonItem lesson={mockLesson} index={0} />);
    expect(screen.getByText("Introduction to HTML")).toBeInTheDocument();
    expect(screen.getByText("8 min")).toBeInTheDocument();
  });

  it("renders as a button for keyboard accessibility", () => {
    render(<LessonItem lesson={mockLesson} index={0} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has correct aria-label for incomplete lesson", () => {
    render(<LessonItem lesson={mockLesson} index={0} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      'Mark "Introduction to HTML" as complete'
    );
  });

  it("toggles completion on click", async () => {
    const user = userEvent.setup();
    render(<LessonItem lesson={mockLesson} index={0} />);

    await user.click(screen.getByRole("button"));
    expect(useProgressStore.getState().isCompleted("l1")).toBe(true);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      'Unmark "Introduction to HTML" as complete'
    );
  });

  it("toggles completion with keyboard Enter", async () => {
    const user = userEvent.setup();
    render(<LessonItem lesson={mockLesson} index={0} />);

    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(useProgressStore.getState().isCompleted("l1")).toBe(true);
  });

  it("toggles completion with keyboard Space", async () => {
    const user = userEvent.setup();
    render(<LessonItem lesson={mockLesson} index={0} />);

    screen.getByRole("button").focus();
    await user.keyboard(" ");
    expect(useProgressStore.getState().isCompleted("l1")).toBe(true);
  });

  it("can toggle back to incomplete", async () => {
    const user = userEvent.setup();
    render(<LessonItem lesson={mockLesson} index={0} />);

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);
    expect(useProgressStore.getState().isCompleted("l1")).toBe(false);
  });
});
