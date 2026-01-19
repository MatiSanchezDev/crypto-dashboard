"use client";

import { useFavorites } from "@/app/dashboard/context/FavoritesContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { searchCoinsAction } from "@/app/dashboard/actions";

// Tipado mínimo para resultados de búsqueda
interface SearchResult {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { favorites, removeFavorite } = useFavorites();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce manual simple
        if (value.length > 2) {
            setIsSearching(true);
            try {
                const data = await searchCoinsAction(value);
                if (data && data.coins) {
                    setSearchResults(data.coins.slice(0, 5));
                }
            } catch (error) {
                console.error("Search error", error);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-neutral-900/80 backdrop-blur-sm sm:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform border-r border-white/5 bg-neutral-900/50 backdrop-blur-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>
                <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                    <Link href="/dashboard" className="mb-8 flex items-center ps-2.5 gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">
                            CD
                        </div>
                        <span className="self-center whitespace-nowrap text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                            CryptoDash
                        </span>
                    </Link>

                    {/* Search */}
                    <div className="mb-6 relative">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="block w-full rounded-lg border border-neutral-700 bg-neutral-800 p-2.5 ps-10 text-sm text-white placeholder-neutral-400 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none transition-colors"
                                placeholder="Search coin..."
                                value={query}
                                onChange={handleSearch}
                            />
                        </div>
                        {/* Search Dropdown */}
                        {searchResults.length > 0 && (
                            <div className="absolute left-0 right-0 top-full mt-2 rounded bg-neutral-800 border border-neutral-700 shadow-xl z-50">
                                <ul className="text-sm text-gray-200">
                                    {searchResults.map(coin => (
                                        <li key={coin.id} className="p-2 hover:bg-neutral-700/50 cursor-pointer flex items-center gap-2">
                                            <Link href={`/dashboard/coin/${coin.id}`} className="flex items-center gap-2 w-full">
                                                <img src={coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full" />
                                                <span>{coin.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Favorites */}
                    <div className="mt-4">
                        <h3 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Favorites</h3>
                        {favorites.length === 0 ? (
                            <p className="text-sm text-neutral-600 italic">No favorites yet.</p>
                        ) : (
                            <ul className="space-y-2">
                                {favorites.map((coin) => (
                                    <li key={coin.id} className="group relative flex items-center justify-between rounded-lg p-2 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-100 transition-colors">
                                        <Link href={`/dashboard/coin/${coin.id}`} className="absolute inset-0 z-0" />
                                        <div className="flex items-center gap-2 relative z-10 pointer-events-none">
                                            <Image src={coin.image} alt={coin.name} width={20} height={20} className="rounded-full grayscale group-hover:grayscale-0 transition-all" />
                                            <span className="text-sm font-medium">{coin.name}</span>
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block w-32 p-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-50 pointer-events-none">
                                            <div className="text-xs text-neutral-400 mb-1">Rank #{coin.market_cap_rank}</div>
                                            <div className="text-sm font-bold text-yellow-500">
                                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(coin.current_price)}
                                            </div>
                                            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-neutral-800 border-l border-b border-neutral-700 rotate-45"></div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                removeFavorite(coin.id)
                                            }}
                                            className="relative z-20 opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-500 p-1 transition-opacity"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
