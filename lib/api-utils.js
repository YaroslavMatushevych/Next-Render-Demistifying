import { format } from 'date-fns';

// Constants to add real variability to data
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'];
const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'SOL', 'DOT', 'ADA', 'XRP'];
const NEWS_SOURCES = ['TechCrunch', 'Bloomberg', 'Reuters', 'CNBC', 'Financial Times'];
const WEATHER_LOCATIONS = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Paris'];

// Utility to add real delays with variability
export const fetchWithDelay = async (
    callback,
    baseDelay = 1000,
    variability = 500
) => {
    const delay = baseDelay + Math.random() * variability;
    await new Promise(resolve => setTimeout(resolve, delay));
    return callback();
};

// Generate realistic stock data
export const fetchStockData = async (
    delay = 2000
) => {
    return fetchWithDelay(() => {
        const now = new Date();

        return STOCK_SYMBOLS.map(symbol => {
            const basePrice = Math.floor(Math.random() * 1000) + 50;
            const change = (Math.random() * 10) - 5; // -5% to +5%
            const volume = Math.floor(Math.random() * 10000000) + 1000000;
            const marketCap = (basePrice * (Math.random() * 100 + 10)).toFixed(2);

            return {
                symbol,
                price: parseFloat(basePrice.toFixed(2)),
                change: parseFloat(change.toFixed(2)),
                volume,
                marketCap,
                lastUpdated: format(now, 'yyyy-MM-dd HH:mm:ss')
            };
        });
    }, delay);
};

// Generate realistic weather data
export const fetchWeatherData = async (
    delay = 1500
) => {
    return fetchWithDelay(() => {
        const now = new Date();

        return WEATHER_LOCATIONS.map(location => {
            const temperature = Math.floor(Math.random() * 35) + 5; // 5 to 40 degrees
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Partly Cloudy'][Math.floor(Math.random() * 5)];
            const humidity = Math.floor(Math.random() * 60) + 30; // 30% to 90%
            const windSpeed = Math.floor(Math.random() * 30) + 5; // 5 to 35 km/h

            return {
                location,
                temperature,
                conditions,
                humidity,
                windSpeed,
                lastUpdated: format(now, 'yyyy-MM-dd HH:mm:ss')
            };
        });
    }, delay);
};

// Generate realistic news data
export const fetchNewsData = async (
    delay = 3000
) => {
    return fetchWithDelay(() => {
        const now = new Date();
        const hours = Array.from({ length: 12 }, (_, i) => i + 1);

        return Array.from({ length: 5 }, (_, i) => {
            const publishedHoursAgo = hours[Math.floor(Math.random() * hours.length)];
            const publishedDate = new Date(now.getTime() - publishedHoursAgo * 60 * 60 * 1000);

            const source = NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)];
            const titles = [
                'Market reaches all-time high amid tech rally',
                'New breakthrough in quantum computing announced',
                'Global supply chain issues continue to affect tech industry',
                'Startup raises $200M in latest funding round',
                'AI regulation framework proposed by international coalition',
                'Cybersecurity concerns rise as attacks increase by 40%',
                'New renewable energy project launches in Europe'
            ];

            return {
                id: `news - ${i + 1}`,
                title: titles[Math.floor(Math.random() * titles.length)],
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod libero at magna dapibus, vel ultrices nunc sagittis.',
                source,
                publishedAt: format(publishedDate, 'yyyy-MM-dd HH:mm:ss')
            };
        });
    }, delay);
};

// Generate realistic crypto data
export const fetchCryptoData = async (
    delay = 2500
) => {
    return fetchWithDelay(() => {
        const now = new Date();

        const cryptoNames = [
            'Bitcoin', 'Ethereum', 'Solana', 'Polkadot', 'Cardano', 'Ripple'
        ];

        return CRYPTO_SYMBOLS.map((symbol, index) => {
            const basePrice = symbol === 'BTC' ?
                Math.floor(Math.random() * 10000) + 40000 :
                Math.floor(Math.random() * 5000) + 1000;

            const change24h = (Math.random() * 10) - 5; // -5% to +5%
            const volume24h = `${(Math.random() * 10 + 1).toFixed(2)}`;
            const marketCap = `${(Math.random() * 500 + 100).toFixed(2)}`;

            return {
                name: cryptoNames[index],
                symbol,
                price: parseFloat(basePrice.toFixed(2)),
                change24h: parseFloat(change24h.toFixed(2)),
                volume24h,
                marketCap,
                lastUpdated: format(now, 'yyyy-MM-dd HH:mm:ss')
            };
        });
    }, delay);
};
