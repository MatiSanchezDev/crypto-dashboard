import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CryptoCard from '@/app/dashboard/components/CryptoCard';
import { FavoritesProvider } from '@/app/dashboard/context/FavoritesContext';

// Mock next/image since it doesn't work well in jsdom environment without config
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

const mockCoin = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/btc.png',
    current_price: 50000,
    market_cap: 1000000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.5,
};

// Wrap component with providers
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <FavoritesProvider>
            {ui}
        </FavoritesProvider>
    );
};

describe('CryptoCard', () => {
    it('renders coin information correctly', () => {
        renderWithProviders(<CryptoCard coin={mockCoin} />);

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('btc')).toBeInTheDocument();
        expect(screen.getByText('$50,000.00')).toBeInTheDocument();
        expect(screen.getByText('+2.50%')).toBeInTheDocument();
    });

    it('handles negative price change correctly', () => {
        const negativeCoin = { ...mockCoin, price_change_percentage_24h: -1.5 };
        renderWithProviders(<CryptoCard coin={negativeCoin} />);

        expect(screen.getByText('-1.50%')).toBeInTheDocument();
    });

    // Critical test for the bug fix
    it('handles null/undefined price change without crashing', () => {
        const nullCoin = { ...mockCoin, price_change_percentage_24h: null as any };
        renderWithProviders(<CryptoCard coin={nullCoin} />);

        // Should verify it renders "N/A" or simply doesn't crash
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('handles undefined price change', () => {
        const undefinedCoin = { ...mockCoin, price_change_percentage_24h: undefined as any };
        renderWithProviders(<CryptoCard coin={undefinedCoin} />);

        expect(screen.getByText('N/A')).toBeInTheDocument();
    });
});
