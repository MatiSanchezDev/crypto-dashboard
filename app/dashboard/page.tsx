import { getMarketCoins } from "@/lib/services/coingecko";
import type { CoinMarket } from "@/lib/types/coingecko";
import CryptoGrid from "./components/CryptoGrid";

export default async function DashboardPage() {
  const coins: CoinMarket[] = await getMarketCoins();

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-gray-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 mb-2">
            Market Overview
          </h1>
          <p className="text-neutral-400 text-lg">
            Real-time performance tracking and insights for top digital assets
          </p>
        </header>

        <CryptoGrid initialCoins={coins} />
      </div>
    </main>
  );
}
