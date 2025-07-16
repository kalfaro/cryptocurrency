import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { getCryptoData } from "~/services/crypto.server";
import { CryptoInfo } from "~/types";
import { SearchInput, CryptoGrid, RefreshButton } from "~/components";
import { useEffect, useMemo, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Dashboard" },
    { name: "description", content: "real-time exchange rates!" }
  ];
};

export const loader = async () => {
  const cryptos: CryptoInfo[] = await getCryptoData();
  return { cryptos };
};

export default function Index() {
  const { cryptos: InitialCryptos } = useLoaderData<typeof loader>();
  const [cryptos, setCryptos] = useState(InitialCryptos);

  const [search, setSearch] = useState("");
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (fetcher.data?.cryptos) {
      setCryptos(fetcher.data.cryptos);
    }
  }, [fetcher.data]);

  const filtered = useMemo(() => {
    return cryptos.filter((crypto) => 
      `${crypto.name} ${crypto.symbol}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  }, [search, cryptos])
  
  return (
    <main className="p-6 max-w-6xl mx-auto pt-20">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch}  />
          <RefreshButton fetcher={fetcher} />
        </div>
        {filtered.length == 0 ? (
          <p className="text-center text-gray-500 mt-8">No results found.</p>
        ): (
          <CryptoGrid cryptos={filtered} />
        )}
      </div>
    </main>
  );
}

