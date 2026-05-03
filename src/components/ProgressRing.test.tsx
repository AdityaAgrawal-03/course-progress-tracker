import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressRing } from "./ProgressRing";

describe("ProgressRing", () => {
  it("renders with correct ARIA attributes", () => {
    render(<ProgressRing value={60} />);
    const ring = screen.getByRole("progressbar");
    expect(ring).toHaveAttribute("aria-valuenow", "60");
    expect(ring).toHaveAttribute("aria-valuemin", "0");
    expect(ring).toHaveAttribute("aria-valuemax", "100");
    expect(ring).toHaveAttribute("aria-label", "60% complete");
  });

  it("displays the percentage text", () => {
    render(<ProgressRing value={42} />);
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("shows 'Done!' at 100%", () => {
    render(<ProgressRing value={100} />);
    expect(screen.getByText("Done!")).toBeInTheDocument();
  });

  it("shows 'Complete' below 100%", () => {
    render(<ProgressRing value={50} />);
    expect(screen.getByText("Complete")).toBeInTheDocument();
  });

  it("hides the SVG from assistive technology", () => {
    render(<ProgressRing value={30} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
