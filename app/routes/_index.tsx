import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Dashboard" },
    { name: "description", content: "real-time exchange rates!" }
  ];
};

export default function Index() {
  return (
    <main className="p-6 max-w-6xl mx-auto pt-20">
      <div className="space-y-6">
        SEARCH IMPUT
        <p>DRID CRYTO</p>
      </div>
    </main>
  );
}

