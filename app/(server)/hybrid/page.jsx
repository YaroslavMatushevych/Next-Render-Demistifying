import { Suspense } from 'react';
import LoadingSpinner from '@/components/server/LoadingSpinner.server';
import WeatherStream from '@/app/(server)/streaming/components/WeatherStream';
import NewsStream from '@/app/(server)/streaming/components/NewsStream';
import ClientOnlyBlock from './ClientOnlyBlock';
import ISRStockBlock from './ISRStockBlock';

export const dynamic = 'force-dynamic'; // ✅ hybrid: page is server-rendered

export default function HybridComparisonPage() {
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
          <Suspense fallback={<LoadingSpinner />}><WeatherStream /></Suspense>
          <Suspense fallback={<LoadingSpinner />}><NewsStream /></Suspense>
        </div>
      </section>

      {/* CLIENT-ONLY: Fully dynamic on browser */}
      <section>
        <ClientOnlyBlock />
      </section>
    </div>
  );
}
