import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModuleSection } from "./ModuleSection";
import { useProgressStore } from "../store/progressStore";
import type { Module } from "../types";

const mockModule: Module = {
  id: "m1",
  title: "Getting Started with HTML",
  lessons: [
    { id: "l1", title: "Introduction to HTML", duration: "8 min", type: "video" },
    { id: "l2", title: "Document Structure", duration: "12 min", type: "article" },
  ],
};

describe("ModuleSection", () => {
  beforeEach(() => {
    useProgressStore.setState({ completedLessons: {} });
  });

  it("renders module title in toggle button", () => {
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);
    expect(screen.getByRole("button", { name: /Getting Started with HTML/i })).toBeInTheDocument();
  });

  it("starts collapsed by default", () => {
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);
    const toggle = screen.getByRole("button", { name: /Getting Started with HTML/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Introduction to HTML")).not.toBeInTheDocument();
  });

  it("starts expanded when defaultOpen is true", () => {
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} defaultOpen />);
    const toggle = screen.getByRole("button", { name: /Getting Started with HTML/i });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Introduction to HTML")).toBeInTheDocument();
  });

  it("expands on click and shows lessons", async () => {
    const user = userEvent.setup();
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);

    await user.click(screen.getByRole("button", { name: /Getting Started with HTML/i }));
    expect(screen.getByText("Introduction to HTML")).toBeInTheDocument();
    expect(screen.getByText("Document Structure")).toBeInTheDocument();
  });

  it("toggles with keyboard Enter", async () => {
    const user = userEvent.setup();
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);

    const toggle = screen.getByRole("button", { name: /Getting Started with HTML/i });
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Introduction to HTML")).toBeInTheDocument();
  });

  it("toggles with keyboard Space", async () => {
    const user = userEvent.setup();
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);

    const toggle = screen.getByRole("button", { name: /Getting Started with HTML/i });
    toggle.focus();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses on second click", async () => {
    const user = userEvent.setup();
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);

    const toggle = screen.getByRole("button", { name: /Getting Started with HTML/i });
    await user.click(toggle);
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Introduction to HTML")).not.toBeInTheDocument();
  });

  it("includes lesson count in aria-label", () => {
    render(<ModuleSection module={mockModule} courseId="cs-101" index={0} />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute(
      "aria-label",
      "Getting Started with HTML — 0 of 2 lessons complete"
    );
  });
});
