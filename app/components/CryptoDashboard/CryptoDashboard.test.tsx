import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { default as CryptoDashboard } from "./CryptoDashboard";
import type { CryptoInfo } from "~/types";

const mockCryptos: CryptoInfo[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://example.com/btc.png",
    usd: 65000,
    btc: 1,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://example.com/eth.png",
    usd: 3500,
    btc: 0.05,
  },
];

const mockFetcher = {
  data: undefined,
  state: "idle",
  Form: (props: any) => <form {...props} data-testid="refresh-form" />,
};

describe("CryptoDashboard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders cryptos correctly", () => {
    render(<CryptoDashboard initialCryptos={mockCryptos} fetcher={mockFetcher} />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /refresh/i })).toBeInTheDocument();
  });

  it("filters cryptos based on search input", async () => {
    render(<CryptoDashboard initialCryptos={mockCryptos} fetcher={mockFetcher} />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "eth" } });

    await waitFor(() => {
      expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
    });
  });

  it("shows no result message when search does not match", async () => {
    render(<CryptoDashboard initialCryptos={mockCryptos} fetcher={mockFetcher} />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "zzz" } });

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
