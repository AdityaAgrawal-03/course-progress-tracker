import { describe, it, expect, beforeEach } from "vitest";
import { screen, act } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { renderWithRouter, resetStore } from "../test/test-utils";
import { courses } from "../data/curriculum";
import { useProgressStore } from "../store/progressStore";

describe("Dashboard", () => {
  beforeEach(() => {
    resetStore();
  });

  it("renders the page heading", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByRole("heading", { name: "Your Learning Path" })).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("CourseTrack")).toBeInTheDocument();
  });

  it("renders a card for each course in the curriculum", () => {
    renderWithRouter(<Dashboard />);
    for (const course of courses) {
      expect(screen.getByText(course.title)).toBeInTheDocument();
    }
  });

  it("renders course card links pointing to /course/:id", () => {
    renderWithRouter(<Dashboard />);
    const links = screen.getAllByRole("link");
    const courseLinks = links.filter((l) =>
      /^\/course\//.test(l.getAttribute("href") ?? "")
    );
    expect(courseLinks).toHaveLength(courses.length);
  });

  it("shows 'Lessons Done' stat label", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Lessons Done/i)).toBeInTheDocument();
  });

  it("shows 'Courses Done' stat label", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Courses Done/i)).toBeInTheDocument();
  });

  it("shows 0 lessons completed initially", () => {
    renderWithRouter(<Dashboard />);
    const statBox = screen.getByText(/Lessons Done/i).closest("div");
    expect(statBox).toHaveTextContent("0");
  });

  it("shows 0 courses done initially", () => {
    renderWithRouter(<Dashboard />);
    const statBox = screen.getByText(/Courses Done/i).closest("div");
    expect(statBox).toHaveTextContent("0");
  });

  it("updates lesson completed count when a lesson is marked done", () => {
    renderWithRouter(<Dashboard />);
    const firstLesson = courses[0].modules[0].lessons[0];
    act(() => {
      useProgressStore.setState({ completedLessons: { [firstLesson.id]: true } });
    });
    const statBox = screen.getByText(/Lessons Done/i).closest("div");
    expect(statBox).toHaveTextContent("1");
  });

  it("updates courses done count when a full course is completed", () => {
    renderWithRouter(<Dashboard />);
    const allLessons = courses[0].modules.flatMap((m) => m.lessons);
    const completed: Record<string, boolean> = {};
    allLessons.forEach((l) => { completed[l.id] = true; });
    act(() => {
      useProgressStore.setState({ completedLessons: completed });
    });
    const statBox = screen.getByText(/Courses Done/i).closest("div");
    expect(statBox).toHaveTextContent("1");
  });

  it("renders footer with tech stack text", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Built with React/i)).toBeInTheDocument();
  });
});
