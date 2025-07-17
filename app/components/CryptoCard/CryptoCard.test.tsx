import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { default as CryptoCard } from './CryptoCard';

const mockData = {
  name: "Bitcoin",
  symbol: "BTC",
  logo: "https://example.com/bitcoin.png",
  usd: 67999.23,
  btc: 1
};

describe("CryptoCard", () => {
  it("renders the crypto name and symbol", () => {
    render(<CryptoCard data={mockData} />);
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getAllByText(mockData.symbol).length).toBeGreaterThan(1);
  });

  it("renders the crypto image with alt text", () => {
    const { getByAltText } = render(<CryptoCard data={mockData} />);
    const image = getByAltText(`${mockData.name} logo`) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockData.logo);
  });

  it("displays formatted USD price", () => {
    const usdFormatted = `$${mockData.usd.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
    render(<CryptoCard data={mockData} />);
    expect(screen.getByText(usdFormatted)).toBeInTheDocument();
  });

  it("displays BTC value with 8 decimals", () => {
    render(<CryptoCard data={mockData} />);
    expect(screen.getByText(mockData.btc.toFixed(8))).toBeInTheDocument();
  });
});
