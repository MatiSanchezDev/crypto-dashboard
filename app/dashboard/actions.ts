"use server";

import { getMarketCoins, searchCoins } from "@/lib/services/coingecko";

export async function fetchMoreCoins(page: number) {
    try {
        const data = await getMarketCoins(page);
        return data;
    } catch (error) {
        console.error("Error loading more coins:", error);
        return [];
    }
}

export async function searchCoinsAction(query: string) {
    if (!query) return { coins: [] };
    try {
        const data = await searchCoins(query);
        return data; // returns object with { coins: [...] }
    } catch (error) {
        console.error("Error searching coins:", error);
        return { coins: [] };
    }
}
