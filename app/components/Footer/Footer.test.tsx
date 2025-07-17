import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { default as Footer } from './Footer';

describe("Footer", () => {
  it("renders title", () => {
    render(<Footer />);
    expect(screen.getByText(/Crypto Dashboard by Kalfaro/i)).toBeInTheDocument();
  })
});
