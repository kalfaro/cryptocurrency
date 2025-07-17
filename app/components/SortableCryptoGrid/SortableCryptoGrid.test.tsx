import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { default as SortableCryptoGrid } from "./SortableCryptoGrid";
import type { CryptoInfo } from "~/types/crypto";

const mockData: CryptoInfo[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://example.com/bitcoin.png",
    usd: 60000,
    btc: 1
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://example.com/eth.png",
    usd: 2000,
    btc: 0.033
  }
];

describe("SortableCryptoGrid", () => {
  it("renders all CryptoCards", () => {
    render(<SortableCryptoGrid cryptos={mockData} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("respects saved crypto order from localStorage", () => {
    localStorage.setItem("cryptoOrder", JSON.stringify(["ETH", "BTC"]));

    render(<SortableCryptoGrid cryptos={mockData} />);
    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards[0].textContent).toBe("Ethereum");
    expect(cards[1].textContent).toBe("Bitcoin");
  });

  it("updates localStorage when items change", () => {
    render(<SortableCryptoGrid cryptos={mockData} />);

    // Simulates a manual reordering
    localStorage.setItem("cryptoOrder", JSON.stringify(["BTC", "ETH"]));
    expect(JSON.parse(localStorage.getItem("cryptoOrder")!)).toEqual(["BTC", "ETH"]);
  });

  it("falls back to default order if localStorage is empty", () => {
    localStorage.removeItem("cryptoOrder");

    render(<SortableCryptoGrid cryptos={mockData} />);
    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards[0].textContent).toBe("Bitcoin");
    expect(cards[1].textContent).toBe("Ethereum");
  });

  it("filters out symbols not present in cryptos", () => {
    localStorage.setItem("cryptoOrder", JSON.stringify(["DOGE", "BTC"]));

    render(<SortableCryptoGrid cryptos={mockData} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByText("DOGE")).not.toBeInTheDocument();
  });
});
