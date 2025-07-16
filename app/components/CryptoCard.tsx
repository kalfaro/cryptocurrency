import type { CryptoInfo } from '~/types';

export default function CryptoCard({ data }: { data: CryptoInfo }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <div className="flex items-center space-x-2">
        <img src={data.logo} alt={data.name} className="w-6 h-6" />
        <h2 className="font-semibold">{data.name} ({data.symbol.toUpperCase()})</h2>
      </div>
      <p className="mt-2 text-lg">${data.usd.toLocaleString()}</p>
    </div>
  )
}
