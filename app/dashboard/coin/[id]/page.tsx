import { getCoinDetails, getCoinHistory } from "@/lib/services/coingecko";
import Image from "next/image";
import SimpleChart from "../../components/SimpleChart";
import Link from "next/link";
import CoinActions from "./components/CoinActions";
import type { CoinMarket } from "@/lib/types/coingecko";

export default async function CoinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params correctly in Next.js 15+ if needed, though usually just prop for now unless it's a promise in future versions (Next 15 is basically async params)
    const { id } = await params;

    // Parallel Fetching
    const detailsData = getCoinDetails(id);
    const historyData = getCoinHistory(id);

    const [details, history] = await Promise.all([detailsData, historyData]);

    if (!details) {
        return <div className="p-8 text-white">Coin not found</div>;
    }

    const isPositive = details.market_data.price_change_percentage_24h > 0;
    const prices = history.prices;

    // Adapt to CoinMarket for CoinActions
    const coinForActions: CoinMarket = {
        id: details.id,
        symbol: details.symbol,
        name: details.name,
        image: details.image.large,
        current_price: details.market_data.current_price.usd,
        market_cap: details.market_data.market_cap.usd,
        market_cap_rank: details.market_data.market_cap_rank,
        price_change_percentage_24h: details.market_data.price_change_percentage_24h
    };

    return (
        <main className="min-h-screen bg-neutral-950 p-8 text-gray-100">
            <div className="mx-auto max-w-7xl">
                <Link href="/dashboard" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-6 transition-colors">
                    ← Back to Dashboard
                </Link>

                {/* Header Section */}
                <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24 bg-white/5 rounded-2xl p-4 backdrop-blur-sm shadow-xl ring-1 ring-white/10">
                            <Image
                                src={details.image.large}
                                alt={details.name}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-white mb-0">
                                    {details.name}
                                </h1>
                                <span className="text-xl text-neutral-400 font-mono bg-white/5 py-1 px-3 rounded-lg border border-white/5">
                                    {details.symbol.toUpperCase()}
                                </span>
                                <span className="text-sm font-bold bg-yellow-500/10 text-yellow-500 py-1 px-3 rounded-full border border-yellow-500/20">
                                    #{details.market_data.market_cap_rank}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xl">
                                <span className="font-bold text-3xl tracking-tight">
                                    ${details.market_data.current_price.usd.toLocaleString()}
                                </span>
                                <span className={`font-semibold px-2 py-1 rounded-lg text-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {isPositive ? '+' : ''}{details.market_data.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <CoinActions coin={coinForActions} />
                </header>

                {/* Chart Section */}
                <section className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-8 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg">
                    <h2 className="text-xl font-bold mb-6 text-gray-300">Price History (7 Days)</h2>
                    <div className="h-[400px] w-full min-w-0">
                        <SimpleChart data={prices} color={isPositive ? "#34d399" : "#fb7185"} />
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Market Cap" value={`$${details.market_data.market_cap.usd.toLocaleString()}`} />
                    <StatCard label="Trading Vol (24h)" value={`$${details.market_data.total_volume.usd.toLocaleString()}`} />
                    <StatCard label="Circulating Supply" value={`${details.market_data.circulating_supply.toLocaleString()} ${details.symbol.toUpperCase()}`} />
                    <StatCard label="All Time High" value={`$${details.market_data.ath.usd.toLocaleString()}`} isAth />
                </section>

                {/* Description */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">About {details.name}</h2>
                    <div
                        className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: details.description.en || "No description available." }}
                    />
                </section>
            </div>
        </main>
    );
}

function StatCard({ label, value, isAth }: { label: string, value: string, isAth?: boolean }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className={`text-xl font-bold ${isAth ? 'text-indigo-400' : 'text-white'}`}>{value}</p>
        </div>
    )
}
