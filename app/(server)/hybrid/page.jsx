import { Suspense } from 'react';
import LoadingSpinner from '@/components/server/LoadingSpinner.server';
import WeatherStream from '@/components/server/WeatherCard.server';
import NewsStream from '@/components/server/NewsCard.server';
import ClientOnlyBlock from './ClientOnlyBlock';
import ISRStockBlock from './ISRStockBlock';
import { fetchNewsData, fetchStockData } from '@/lib/api-utils';

export const dynamic = 'force-dynamic'; // ✅ hybrid: page is server-rendered

export default async function HybridComparisonPage() {
      const [weatherData, newsData] = await Promise.all([
          fetchStockData(2000),
          fetchNewsData(3000),
      ]);
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-12">
      <h1 className="heading">Hybrid Rendering Strategy Demo</h1>

      {/* ISR: Just one block uses static regeneration */}
      <section>
        <ISRStockBlock />
      </section>

      {/* STREAMING: Show parts while loading */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<LoadingSpinner />}><WeatherStream data={weatherData} /></Suspense>
          <Suspense fallback={<LoadingSpinner />}><NewsStream data={newsData} /></Suspense>
        </div>
      </section>

      {/* CLIENT-ONLY: Fully dynamic on browser */}
      <section>
        <ClientOnlyBlock />
      </section>
    </div>
  );
}
