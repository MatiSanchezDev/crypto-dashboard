"use client";

import { useFavorites } from "@/app/dashboard/context/FavoritesContext";
import type { CoinMarket } from "@/lib/types/coingecko";

interface CoinActionsProps {
    coin: CoinMarket;
}

export default function CoinActions({ coin }: CoinActionsProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const isFav = isFavorite(coin.id);

    const toggleFavorite = () => {
        if (isFav) {
            removeFavorite(coin.id);
        } else {
            addFavorite(coin);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`p-3 rounded-xl transition-all flex items-center gap-2 font-medium ${isFav
                    ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {isFav ? "Favorited" : "Add to Favorites"}
        </button>
    );
}
