import type { MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { getCryptoData } from "~/services/crypto.server";
import { CryptoInfo } from "~/types";
import { SearchInput, SortableCryptoGrid, RefreshButton } from "~/components";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "~/utils/useDebouncedValue";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Dashboard" },
    { name: "description", content: "real-time exchange rates!" }
  ];
};

export const loader = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const cryptos: CryptoInfo[] = await getCryptoData();
    return { cryptos };
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const { cryptos: InitialCryptos } = useLoaderData<typeof loader>();
  const [cryptos, setCryptos] = useState(InitialCryptos);
  const [search, setSearch] = useState("");
  // For Refresh button
  const fetcher = useFetcher<typeof loader>();
  // Here it updates only after 300ms without changes
  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    if (fetcher.data?.cryptos) {
      setCryptos(fetcher.data.cryptos);
    }
  }, [fetcher.data]);

  const filtered = useMemo(() => {
    return cryptos.filter((crypto) =>
      `${crypto.name} ${crypto.symbol}`.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase())
    )
  }, [debouncedSearch, cryptos])

  return (
    <main className="p-6 max-w-6xl mx-auto pt-20">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} />
          <RefreshButton fetcher={fetcher} />
        </div>
        {filtered.length == 0 ? (
          <p className="text-center text-gray-500 mt-8">No results found.</p>
        ): (
          <SortableCryptoGrid cryptos={filtered} />
        )}
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const normalized = normalizeError(error);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {normalized.status}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {normalized.message}
          </p>
        </div>
      </div>
    </section>
  );
}

export function normalizeError(error: unknown): { status: number; message: string; } {
  if (isRouteErrorResponse(error)) {
    return {
      status: error.status,
      message: typeof error.data === 'string'
        ? error.data
        : error.statusText || 'Unexpected response error'
    };
  }

  if (error instanceof Error) {
    return { status: 500, message: error.message || 'Unknown error' };
  }

  return { status: 500, message: 'Unknown error occurred' };
}
