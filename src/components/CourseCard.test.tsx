import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { CourseCard } from "./CourseCard";
import { renderWithRouter, resetStore } from "../test/test-utils";
import type { Course } from "../types";

const mockCourse: Course = {
  id: "cs-101",
  title: "Web Development Fundamentals",
  description: "Master HTML, CSS, and JavaScript from the ground up.",
  instructor: "Sarah Chen",
  difficulty: "beginner",
  totalDuration: "4h 32min",
  thumbnail: "🌐",
  modules: [
    {
      id: "m1",
      title: "Getting Started with HTML",
      lessons: [
        { id: "l1", title: "Introduction to HTML", duration: "8 min", type: "video" },
        { id: "l2", title: "Document Structure", duration: "12 min", type: "article" },
      ],
    },
  ],
};

describe("CourseCard", () => {
  beforeEach(() => {
    resetStore();
  });

  it("renders course title", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(screen.getByText("Web Development Fundamentals")).toBeInTheDocument();
  });

  it("renders course description", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(
      screen.getByText(/Master HTML, CSS, and JavaScript/)
    ).toBeInTheDocument();
  });

  it("renders instructor name", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders difficulty badge", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("renders as a link to the course page", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/course/cs-101");
  });

  it("is keyboard focusable as a link", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    const link = screen.getByRole("link");
    link.focus();
    expect(link).toHaveFocus();
  });

  it("shows lesson count", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(screen.getByText(/\d+ lessons/)).toBeInTheDocument();
  });

  it("shows progress bar with ARIA attributes", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "0");
  });

  it("shows 'Start Course' CTA when no progress", () => {
    renderWithRouter(<CourseCard course={mockCourse} index={0} />);
    expect(screen.getByText("Start Course →")).toBeInTheDocument();
  });
});
