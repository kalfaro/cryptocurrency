import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { default as ThemeToggle } from './ThemeToggle';

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Reset document state before each test
    document.documentElement.className = ''
    localStorage.clear();
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /Toggle Theme/i })).toBeInTheDocument();
  });

  it("sets dark mode on click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    // Initially should not have dark class
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("respects saved theme on mount", () => {
    localStorage.setItem("theme", "dark");

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
  
});
