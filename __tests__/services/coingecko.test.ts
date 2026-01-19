import { getMarketCoins, getCoinDetails, getCoinHistory, searchCoins } from '@/lib/services/coingecko';

// Mock fetch globally
global.fetch = jest.fn();

describe('CoinGecko Service', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('getMarketCoins should return data on success', async () => {
        const mockData = [{ id: 'bitcoin', name: 'Bitcoin' }];
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const data = await getMarketCoins();
        expect(data).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('getMarketCoins should throw error on failure', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(getMarketCoins()).rejects.toThrow("Error fetching CoinGecko data");
    });

    it('searchCoins should return results', async () => {
        const mockData = { coins: [{ id: 'bitcoin', name: 'Bitcoin' }] };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const data = await searchCoins("bit");
        expect(data).toEqual(mockData);
    });

    it('getCoinDetails should return details', async () => {
        const mockData = { id: 'bitcoin', description: { en: 'desc' } };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const data = await getCoinDetails("bitcoin");
        expect(data).toEqual(mockData);
    });

    it('getCoinHistory should return history', async () => {
        const mockData = { prices: [[1, 2]] };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const data = await getCoinHistory("bitcoin");
        expect(data).toEqual(mockData);
    });
});
