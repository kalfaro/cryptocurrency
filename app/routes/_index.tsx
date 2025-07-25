import type { MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { getCryptoData } from "~/services/crypto.server";
import { CryptoInfo } from "~/types";
import { CryptoDashboard } from "~/components";

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
  const { cryptos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  return <CryptoDashboard initialCryptos={cryptos} fetcher={fetcher} />;
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

export function normalizeError(error: unknown): { status: number; message: string } {
  if (isRouteErrorResponse(error)) {
    return {
      status: error.status,
      message: typeof error.data === 'string'
        ? error.data
        : error.statusText || 'Unexpected response error',
    };
  }

  if (error instanceof Error) {
    // Try to parse the message with format "message;status;statusText"
    const parts = error.message.split(";");
    if (parts.length === 3 && !isNaN(Number(parts[1]))) {
      return {
        status: Number(parts[1]),
        message: parts[0] + " - " + parts[2],
      };
    }

    return { status: 500, message: error.message || 'Unknown error' };
  }

  return { status: 500, message: 'Unknown error occurred' };
}
