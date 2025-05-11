import { fetchStockData, fetchWeatherData, fetchNewsData, fetchCryptoData } from '@/lib/api-utils';
import StockCard from '@/components/client/StockCard.client';
import WeatherCard from '@/components/client/WeatherCard.client';
import NewsCard from '@/components/client/NewsCard.client';
import CryptoCard from '@/components/client/CryptoCard.client';

export const dynamic = 'force-static'; // Next.js builds at compile time

export default async function StaticPage() {
    const [stock, weather, news, crypto] = await Promise.all([
        fetchStockData(),
        fetchWeatherData(),
        fetchNewsData(),
        fetchCryptoData()
    ]);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StockCard data={stock} />
                <WeatherCard data={weather} />
                <NewsCard data={news} />
                <CryptoCard data={crypto} />
            </div>
        </div>
    );
}
