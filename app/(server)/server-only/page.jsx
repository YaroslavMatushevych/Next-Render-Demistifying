// app/server-only/page.tsx
import {
    fetchStockData,
    fetchWeatherData,
    fetchNewsData,
    fetchCryptoData
} from '@/lib/api-utils';
import StockCard from '@/components/server/StockCard.server';
import WeatherCard from '@/components/server/WeatherCard.server';
import NewsCard from '@/components/server/NewsCard.server';
import CryptoCard from '@/components/server/CryptoCard.server';

// Traditional server-side rendering - all data must be fetched before any rendering
export default async function ServerOnlyPage() {
    // All data is fetched in parallel, but page doesn't render until ALL fetches complete
    const [stockData, weatherData, newsData, cryptoData] = await Promise.all([
        fetchStockData(2000),
        fetchWeatherData(1500),
        fetchNewsData(3000),
        fetchCryptoData(2500)
    ]);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <h1 className="heading">Financial Dashboard (Server-Only)</h1>
                <p className="mb-6 text-gray-600">
                    This page demonstrates traditional server-side rendering with blocking data fetching.
                    The page is only sent to the client after all data is fetched.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stock Data */}
                    <StockCard data={stockData} />

                    {/* Weather Data */}
                    <WeatherCard data={weatherData} />

                    {/* News Data */}
                    <NewsCard data={newsData} />

                    {/* Crypto Data */}
                    <CryptoCard data={cryptoData} />
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                    <h2 className="font-bold text-lg text-green-800 mb-2">How Server-Only Rendering Works</h2>
                    <p className="text-green-900">
                        With server-only rendering, all data is fetched on the server before any HTML is sent to the client.
                        This ensures the client receives complete content, but increases the Time to First Byte (TTFB)
                        as the server must wait for all data fetches to complete.
                    </p>
                </div>
            </div>
        </div>
    );
}