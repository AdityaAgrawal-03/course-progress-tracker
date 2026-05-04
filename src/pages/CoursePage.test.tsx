import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CoursePage } from "./CoursePage";
import { useProgressStore } from "../store/progressStore";
import { courses } from "../data/curriculum";

function renderCoursePage(courseId: string) {
  return render(
    <MemoryRouter initialEntries={[`/course/${courseId}`]}>
      <Routes>
        <Route path="/course/:courseId" element={<CoursePage />} />
      </Routes>
    </MemoryRouter>
  );
}

const cs101 = courses.find((c) => c.id === "cs-101")!;
const allCs101Lessons = cs101.modules.flatMap((m) => m.lessons);

describe("CoursePage", () => {
  beforeEach(() => {
    useProgressStore.setState({ completedLessons: {} });
    vi.restoreAllMocks();
  });

  describe("unknown course", () => {
    it("shows Course Not Found message", () => {
      renderCoursePage("does-not-exist");
      expect(screen.getByText("Course Not Found")).toBeInTheDocument();
    });

    it("has a link back to the dashboard", () => {
      renderCoursePage("does-not-exist");
      const link = screen.getByRole("link", { name: /Back to Dashboard/i });
      expect(link).toHaveAttribute("href", "/");
    });
  });

  describe("valid course (cs-101)", () => {
    it("renders the course title in the header", () => {
      renderCoursePage("cs-101");
      // Title appears in both the sticky header <h1> and the sidebar <h2>
      expect(screen.getAllByText("Web Development Fundamentals").length).toBeGreaterThanOrEqual(1);
    });

    it("has a back link to all courses", () => {
      renderCoursePage("cs-101");
      const backLink = screen.getByRole("link", { name: /Back to all courses/i });
      expect(backLink).toHaveAttribute("href", "/");
    });

    it("renders the Curriculum heading", () => {
      renderCoursePage("cs-101");
      expect(screen.getByRole("heading", { name: "Curriculum" })).toBeInTheDocument();
    });

    it("shows the correct module count", () => {
      renderCoursePage("cs-101");
      expect(screen.getByText(`${cs101.modules.length} modules`)).toBeInTheDocument();
    });

    it("auto-expands the first module when no lessons are complete", () => {
      renderCoursePage("cs-101");
      const firstModuleBtn = screen.getByRole("button", {
        name: /Getting Started with HTML/i,
      });
      expect(firstModuleBtn).toHaveAttribute("aria-expanded", "true");
    });

    it("keeps other modules collapsed initially", () => {
      renderCoursePage("cs-101");
      const stylingBtn = screen.getByRole("button", { name: /Styling with CSS/i });
      expect(stylingBtn).toHaveAttribute("aria-expanded", "false");
    });

    it("shows initial progress of 0%", () => {
      renderCoursePage("cs-101");
      // "0%" appears in both the header bar and ProgressRing
      expect(screen.getAllByText("0%").length).toBeGreaterThanOrEqual(1);
    });

    it("shows lesson count in header as 0/total initially", () => {
      renderCoursePage("cs-101");
      expect(
        screen.getByText(`0/${allCs101Lessons.length}`)
      ).toBeInTheDocument();
    });

    it("shows lesson type breakdown in sidebar", () => {
      renderCoursePage("cs-101");
      // Scope to the "Content Types" section in the sidebar
      const contentTypesHeading = screen.getByText(/Content Types/i);
      const section = contentTypesHeading.closest("div")!;
      expect(section).toHaveTextContent("Video");
      expect(section).toHaveTextContent("Article");
      expect(section).toHaveTextContent("Quiz");
      expect(section).toHaveTextContent("Exercise");
    });

    it("hides reset button when no progress", () => {
      renderCoursePage("cs-101");
      expect(
        screen.queryByRole("button", { name: /Reset all progress/i })
      ).not.toBeInTheDocument();
    });

    it("shows reset button when some lessons are completed", () => {
      useProgressStore.setState({
        completedLessons: { [allCs101Lessons[0].id]: true },
      });
      renderCoursePage("cs-101");
      expect(
        screen.getByRole("button", { name: /Reset all progress for Web Development Fundamentals/i })
      ).toBeInTheDocument();
    });

    it("reset button clears course progress when user confirms", async () => {
      const user = userEvent.setup();
      // happy-dom doesn't define window.confirm — assign a mock directly
      window.confirm = vi.fn().mockReturnValue(true);
      useProgressStore.setState({
        completedLessons: { [allCs101Lessons[0].id]: true },
      });
      renderCoursePage("cs-101");

      await user.click(screen.getByRole("button", { name: /Reset all progress/i }));

      expect(useProgressStore.getState().completedLessons).toEqual({});
    });

    it("reset button does nothing when user cancels", async () => {
      const user = userEvent.setup();
      // happy-dom doesn't define window.confirm — assign a mock directly
      window.confirm = vi.fn().mockReturnValue(false);
      const initialState = { [allCs101Lessons[0].id]: true };
      useProgressStore.setState({ completedLessons: initialState });
      renderCoursePage("cs-101");

      await user.click(screen.getByRole("button", { name: /Reset all progress/i }));

      expect(useProgressStore.getState().completedLessons).toEqual(initialState);
    });

    it("shows completion banner when all lessons are done", () => {
      const completed: Record<string, boolean> = {};
      allCs101Lessons.forEach((l) => { completed[l.id] = true; });
      useProgressStore.setState({ completedLessons: completed });

      renderCoursePage("cs-101");
      expect(screen.getByText("Course Completed!")).toBeInTheDocument();
    });

    it("does not show completion banner with partial progress", () => {
      useProgressStore.setState({
        completedLessons: { [allCs101Lessons[0].id]: true },
      });
      renderCoursePage("cs-101");
      expect(screen.queryByText("Course Completed!")).not.toBeInTheDocument();
    });

    it("shows 100% when all lessons are done", () => {
      const completed: Record<string, boolean> = {};
      allCs101Lessons.forEach((l) => { completed[l.id] = true; });
      useProgressStore.setState({ completedLessons: completed });

      renderCoursePage("cs-101");
      // "100%" appears in both the header bar and ProgressRing
      expect(screen.getAllByText("100%").length).toBeGreaterThanOrEqual(1);
    });

    it("auto-expands the first module that has incomplete lessons", () => {
      // Complete all lessons in m1, so m2 becomes the first incomplete module
      const m1Lessons = cs101.modules[0].lessons;
      const completed: Record<string, boolean> = {};
      m1Lessons.forEach((l) => { completed[l.id] = true; });
      useProgressStore.setState({ completedLessons: completed });

      renderCoursePage("cs-101");

      const m1Btn = screen.getByRole("button", { name: /Getting Started with HTML/i });
      const m2Btn = screen.getByRole("button", { name: /Styling with CSS/i });
      expect(m1Btn).toHaveAttribute("aria-expanded", "false");
      expect(m2Btn).toHaveAttribute("aria-expanded", "true");
    });
  });
});
