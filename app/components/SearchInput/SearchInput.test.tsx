import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { default as SearchInput} from "./SearchInput";

describe("SearchInput", () => {
  it("renders input with correct placeholder and value", () => {
    render(<SearchInput value="BTC" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search by name or symbol/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("BTC");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/search by name or symbol/i);
    
    fireEvent.change(input, { target: { value: "ETH" } });
    
    expect(handleChange).toHaveBeenCalledWith("ETH");
  });
});
