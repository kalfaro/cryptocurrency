import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCryptoData, CRYPTOS } from "./crypto.server";

global.fetch = vi.fn();

const fakeRates = {
  USD: "60000",
  ETH: "15",
  SOL: "200",
  ADA: "1000",
  DOT: "800",
  DOGE: "3000",
  AVAX: "400",
  LTC: "600",
  BCH: "250",
  XLM: "5000"
};

describe("getCryptoData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns parsed crypto data", async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { rates: fakeRates } })
    });

    const result = await getCryptoData();

    expect(result).toHaveLength(CRYPTOS.length);
    expect(result[0]).toEqual({
      name: "Bitcoin",
      symbol: "BTC",
      logo: CRYPTOS[0].logo,
      usd: 60000,
      btc: 1
    });

    const sol = result.find((c) => c.symbol === "SOL");
    expect(sol?.usd).toBeCloseTo((1 / 200) * 60000, 2);
    expect(sol?.btc).toBeCloseTo(1 / 200, 8);
  });

  it("throws error on failed response", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error"
    });

    await expect(getCryptoData()).rejects.toThrow("Oops something fails with Coinbase API");
  });
});
