import { getMarketCoins } from "@/lib/services/coingecko";
import type { CoinMarket } from "@/lib/types/coingecko";
import CryptoGrid from "./components/CryptoGrid";

export default async function DashboardPage() {
  const coins: CoinMarket[] = await getMarketCoins();

  return (
    <main className="min-h-screen bg-gray-950 p-8 text-gray-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 mb-2">
            CoinBara Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Live market data for top cryptocurrencies
          </p>
        </header>

        <CryptoGrid initialCoins={coins} />
      </div>
    </main>
  );
}
