import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCryptoData } from "~/services/crypto.server";
import { CryptoInfo } from "~/types";
import { CryptoGrid } from "~/components"

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
  const { cryptos } = useLoaderData<typeof loader>();
  
  return (
    <main className="p-6 max-w-6xl mx-auto pt-20">
      <div className="space-y-6">
        <CryptoGrid cryptos={cryptos} />
      </div>
    </main>
  );
}

