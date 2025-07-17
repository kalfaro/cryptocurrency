import { useEffect, useMemo, useState } from "react";
import { SearchInput, SortableCryptoGrid, RefreshButton } from "~/components";
import { useDebouncedValue } from "~/utils/useDebouncedValue";
import type { CryptoInfo } from "~/types";
import type { FetcherWithComponents } from "@remix-run/react";

export default function CryptoDashboard({
  initialCryptos, fetcher
}: {
  initialCryptos: CryptoInfo[];
  fetcher: FetcherWithComponents<{ cryptos: CryptoInfo[] }>;
}) {
  const [cryptos, setCryptos] = useState(initialCryptos);
  const [search, setSearch] = useState("");
  // Here it updates only after 300ms without changes
  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    if (fetcher.data?.cryptos) {
      setCryptos(fetcher.data.cryptos);
    }
  }, [fetcher.data]);

  const filtered = useMemo(() => {
    return cryptos.filter((crypto) =>
      `${crypto.name} ${crypto.symbol}`.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, cryptos]);

  return (
    <main className="p-6 max-w-6xl mx-auto pt-20">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} />
          <RefreshButton fetcher={fetcher} />
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No results found.</p>
        ) : (
          <SortableCryptoGrid cryptos={filtered} />
        )}
      </div>
    </main>
  );
}
