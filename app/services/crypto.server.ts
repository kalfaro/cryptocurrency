import type { CryptoInfo } from "~/types";

export const CRYPTOS = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
  }
];

export async function getCryptoData(): Promise<CryptoInfo[]> {
  const res = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=BTC");
  const json = await res.json();
  const rates = json.data.rates;
  const btcToUsd = parseFloat(rates["USD"]);

  const result = CRYPTOS.map((crypto) => {
    if (crypto.symbol === "BTC") {
      return {
        name: crypto.name,
        symbol: "BTC",
        logo: crypto.logo,
        usd: btcToUsd,
        btc: 1
      };
    }

    const btcRate = 1 / parseFloat(rates[crypto.symbol]); // symbol => BTC
    const usdRate = btcRate * btcToUsd;

    return {
      name: crypto.name,
      symbol: crypto.symbol,
      logo: crypto.logo,
      usd: parseFloat(usdRate.toFixed(2)),
      btc: parseFloat(btcRate.toFixed(8))
    };
  });

  return result;
}