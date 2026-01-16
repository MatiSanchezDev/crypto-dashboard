"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CoinMarket } from "@/lib/types/coingecko";

interface FavoritesContextType {
    favorites: CoinMarket[];
    addFavorite: (coin: CoinMarket) => void;
    removeFavorite: (coinId: string) => void;
    isFavorite: (coinId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<CoinMarket[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("crypto_favorites");
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const saveFavorites = (newFavorites: CoinMarket[]) => {
        setFavorites(newFavorites);
        localStorage.setItem("crypto_favorites", JSON.stringify(newFavorites));
    };

    const addFavorite = (coin: CoinMarket) => {
        if (!favorites.find((fav) => fav.id === coin.id)) {
            saveFavorites([...favorites, coin]);
        }
    };

    const removeFavorite = (coinId: string) => {
        saveFavorites(favorites.filter((fav) => fav.id !== coinId));
    };

    const isFavorite = (coinId: string) => {
        return favorites.some((fav) => fav.id === coinId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
