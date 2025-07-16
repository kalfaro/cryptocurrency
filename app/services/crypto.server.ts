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
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    logo: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    logo: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png"
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    logo: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png"
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    logo: "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png"
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png"
  },
  {
    id: "bitcoin-cash",
    symbol: "BCH",
    name: "Bitcoin Cash",
    logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png"
  },
  {
    id: "stellar",
    symbol: "XLM",
    name: "Stellar",
    logo: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png"
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