import { describe, it, expect } from "vitest";
import { parseDuration, formatRemainingTime } from "./progress";

describe("parseDuration", () => {
  it("extracts minutes from duration string", () => {
    expect(parseDuration("8 min")).toBe(8);
    expect(parseDuration("20 min")).toBe(20);
  });

  it("returns 0 for invalid input", () => {
    expect(parseDuration("")).toBe(0);
    expect(parseDuration("no numbers")).toBe(0);
  });
});

describe("formatRemainingTime", () => {
  it("formats minutes only", () => {
    expect(formatRemainingTime(30, 10)).toBe("20m remaining");
  });

  it("formats hours and minutes", () => {
    expect(formatRemainingTime(150, 10)).toBe("2h 20m remaining");
  });

  it("formats exact hours without minutes", () => {
    expect(formatRemainingTime(120, 0)).toBe("2h remaining");
  });

  it("returns 0m for no remaining time", () => {
    expect(formatRemainingTime(60, 60)).toBe("0m remaining");
  });

  it("clamps to 0 when completed exceeds total", () => {
    expect(formatRemainingTime(10, 20)).toBe("0m remaining");
  });
});
