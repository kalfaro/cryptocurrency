import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { default as Navbar } from './Navbar';

describe("Navbar", () => {
  it("renders Navbar Title", () => {
    render(<Navbar />);
    expect(screen.getByText(/Crypto Dashboard/i)).toBeInTheDocument();
  })

  it("renders ThemeToggle button", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Toggle Theme/i })).toBeInTheDocument();
  });
});
