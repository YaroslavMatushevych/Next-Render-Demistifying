import { fetchStockData, fetchWeatherData, fetchNewsData, fetchCryptoData } from '@/lib/api-utils';
import StockCard from '@/components/server/StockCard.server';
import WeatherCard from '@/components/server/WeatherCard.server';
import NewsCard from '@/components/server/NewsCard.server';
import CryptoCard from '@/components/server/CryptoCard.server';

export const revalidate = 60; // ISR: regenerate this page every 60 seconds

export default async function ISRPage() {
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
