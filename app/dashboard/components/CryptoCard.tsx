"use client";

import Image from "next/image";
import type { CoinMarket } from "@/lib/types/coingecko";
import { useFavorites } from "@/app/dashboard/context/FavoritesContext";
import Link from "next/link";

interface CryptoCardProps {
  coin: CoinMarket;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(coin.id);
  const isPositive = coin.price_change_percentage_24h > 0;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent blocking navigation
    e.stopPropagation();
    if (isFav) {
      removeFavorite(coin.id);
    } else {
      addFavorite(coin);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number | undefined | null) => {
    if (value === undefined || value === null) return "N/A";
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-neutral-900/50 p-6 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-yellow-500/10 border border-white/5">
      <Link
        href={`/dashboard/coin/${coin.id}`}
        className="absolute inset-0 z-0"
      />

      <div className="flex items-center justify-between mb-4 relative z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/5 p-2 ring-1 ring-white/10 group-hover:ring-yellow-500/50 transition-all">
            <Image
              src={coin.image}
              alt={coin.name}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">{coin.name}</h3>
            <p className="text-sm text-neutral-400 uppercase">{coin.symbol}</p>
          </div>
        </div>
        {/* Adjusted badge position or just layout to prevent overlap */}
        <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-neutral-400 self-start mt-1 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors">
          #{coin.market_cap_rank}
        </span>
      </div>

      <button
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all ${isFav
            ? "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20"
            : "text-neutral-500 hover:bg-white/10 hover:text-white"
          }`}
        style={{ top: "1px", right: "1px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFav ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      <div className="space-y-4 relative z-10 pointer-events-none">
        <div>
          <p className="text-sm text-neutral-400">Current Price</p>
          <p className="text-2xl font-bold text-white tracking-tight">
            {formatCurrency(coin.current_price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
          <div>
            <p className="text-xs text-neutral-400">24h Change</p>
            <p
              className={`text-sm font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"
                }`}
            >
              {isPositive ? "+" : ""}
              {formatPercentage(coin.price_change_percentage_24h)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Market Cap</p>
            <p className="text-sm font-medium text-neutral-300">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
                style: "currency",
                currency: "USD",
              }).format(coin.market_cap)}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-500/5 blur-3xl transition-opacity group-hover:opacity-40" />
    </div>
  );
}
