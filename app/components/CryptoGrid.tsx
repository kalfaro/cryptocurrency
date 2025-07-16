import type { CryptoInfo } from '~/types';
import CryptoCard from './CryptoCard';

export default function CryptoGrid({ cryptos }: { cryptos: CryptoInfo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.symbol} data={crypto} />
      ))}
    </div>
  );
}
