import type { CryptoInfo } from '~/types';

export default function CryptoCard({ data }: { data: CryptoInfo }) {
  return (
    <div className="rounded-xl shadow-md p-5 bg-white dark:bg-gray-800 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={data.logo}
          alt={`${data.name} logo`}
          className="w-10 h-10 rounded-full border"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.name}
          </h2>
          <p className="text-sm text-gray-500 uppercase">{data.symbol}</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <div className="flex justify-between">
          <span className="font-medium">USD</span>
          <span className="font-mono text-green-600 dark:text-green-400">
            ${data.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">BTC</span>
          <span className="font-mono text-yellow-500">
            {data.btc.toFixed(8)}
          </span>
        </div>
      </div>
    </div>
  );
}
