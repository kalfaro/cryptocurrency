import type { FetcherWithComponents } from "@remix-run/react";
import { CryptoInfo } from "~/types";

export default function RefreshButton({fetcher}: { fetcher: FetcherWithComponents<{ cryptos: CryptoInfo[] }>; }) {
  return (
    <fetcher.Form method="get">
      <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition duration-200">
        {fetcher.state === "loading" ? "Refreshing..." : "Refresh"}
      </button>
    </fetcher.Form>
  );
}
