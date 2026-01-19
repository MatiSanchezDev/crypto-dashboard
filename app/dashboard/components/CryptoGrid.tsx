"use client";

import { useEffect, useState, useRef } from "react";
import type { CoinMarket } from "@/lib/types/coingecko";
import CryptoCard from "./CryptoCard";
import { fetchMoreCoins } from "../actions";

interface CryptoGridProps {
    initialCoins: CoinMarket[];
}

export default function CryptoGrid({ initialCoins }: CryptoGridProps) {
    const [coins, setCoins] = useState<CoinMarket[]>(initialCoins);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading && hasMore) {
                    setLoading(true);
                    const nextPage = page + 1;
                    try {
                        const newCoins = await fetchMoreCoins(nextPage);
                        if (newCoins.length === 0) {
                            setHasMore(false);
                        } else {
                            setCoins((prev) => [...prev, ...newCoins]);
                            setPage(nextPage);
                        }
                    } catch (error) {
                        console.error("Error loading more coins", error);
                    } finally {
                        setLoading(false);
                    }
                }
            },
            { rootMargin: "100px" }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loading, hasMore, page]);

    return (
        <>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {coins.map((coin, index) => (
                    // Usar index como parte de la key para evitar duplicados si la API retorna lo mismo en dev mode
                    <CryptoCard key={`${coin.id}-${index}`} coin={coin} />
                ))}
            </section>

            {/* Loading Sentinel */}
            <div
                ref={loaderRef}
                className="mt-8 flex justify-center p-4"
            >
                {loading && (
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                )}
                {!hasMore && (
                    <p className="text-gray-500">No more coins to load.</p>
                )}
            </div>
        </>
    );
}
