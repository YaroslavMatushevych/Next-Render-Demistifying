// streaming-page.js
import { Suspense } from 'react';
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


function LoadingCard({ label }) {
    return (
        <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md animate-pulse h-64">
            <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                {label}
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-16 bg-gray-200 rounded w-full mt-4"></div>
            </div>
        </div>
    );
}

async function StreamingCard({ label, fetcher, Component, delay }) {
    const data = await fetcher(delay);
    return (
        <div className="relative">
            <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                {label}
            </div>
            <Component data={data} />
        </div>
    );
}

// Server component that simulates 3s delay
export async function NestedOuter() {
    await new Promise((res) => setTimeout(res, 3000));
    return (
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
        <div className="flex justify-between items-center">
          <div className="font-medium text-blue-800">Outer Component (3s)</div>
          <div className="text-xs text-gray-500">Rendered: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    );
}

// Server component that simulates 3s delay
export async function NestedInner() {
    await new Promise((res) => setTimeout(res, 3000));
    return (
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
        <div className="flex justify-between items-center">
          <div className="font-medium text-blue-800">Inner Component (3s)</div>
          <div className="text-xs text-gray-500">Rendered: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    );
}
  
  
export default function StreamingPage() {
    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                    React Server Components with Streaming
                </h1>
                <p className="mt-2 text-gray-600">
                    This page demonstrates how streaming with React Server Components works.
                    Watch as content streams in progressively without blocking the page.
                </p>
            </div>

            {/* Main content area with streaming cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Suspense fallback={<LoadingCard label="Stock Component Streaming" />}>
                    <StreamingCard
                        label="Server Component + Suspense"
                        fetcher={fetchStockData}
                        Component={StockCard}
                        delay={2000}
                    />
                </Suspense>

                <Suspense fallback={<LoadingCard label="Weather Component Streaming" />}>
                    <StreamingCard
                        label="Server Component + Suspense"
                        fetcher={fetchWeatherData}
                        Component={WeatherCard}
                        delay={1500}
                    />
                </Suspense>

                <Suspense fallback={<LoadingCard label="News Component Streaming" />}>
                    <StreamingCard
                        label="Server Component + Suspense"
                        fetcher={fetchNewsData}
                        Component={NewsCard}
                        delay={3000}
                    />
                </Suspense>

                <Suspense fallback={<LoadingCard label="Crypto Component Streaming" />}>
                    <StreamingCard
                        label="Server Component + Suspense"
                        fetcher={fetchCryptoData}
                        Component={CryptoCard}
                        delay={2500}
                    />
                </Suspense>
            </div>

            {/* Nested Suspense Demonstration */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Nested Suspense Boundaries</h2>
              <p className="text-gray-600 mb-6">
                This section demonstrates how nested Suspense boundaries work in React Server Components.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Example 1: Waterfall */}
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">Waterfall Loading</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Components load sequentially (outer first, then inner) for 6s total.
                  </p>
                  <div className="space-y-4">
                    <Suspense fallback={<div className="text-sm text-gray-600">Loading outer...</div>}>
                      <NestedOuter />
                      <Suspense fallback={<div className="text-sm text-gray-600 mt-4">Loading inner...</div>}>
                        <NestedInner />
                      </Suspense>
                    </Suspense>
                  </div>
                </div>

                {/* Example 2: Progressive */}
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">Progressive Loading</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Each Suspense resolves independently. Outer shows after 3s, inner after 3s.
                  </p>
                  <div className="space-y-4">
                    <Suspense fallback={<div className="text-sm text-gray-600">Loading outer...</div>}>
                      <NestedOuter />
                    </Suspense>
                    
                    <Suspense fallback={<div className="text-sm text-gray-600">Loading inner...</div>}>
                      <NestedInner />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>

            {/* Streaming Explanation */}
            <div className="mt-12">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h2 className="font-bold text-xl text-blue-800 mb-3">How React Server Components Streaming Works</h2>
                    <div className="space-y-4">
                        <p className="text-blue-900">
                            The key difference from client-side rendering is that with streaming and React Server Components:
                        </p>

                        <div className="bg-white p-5 rounded-lg border border-blue-200">
                            <h3 className="font-semibold text-blue-700 mb-3">Streaming Process:</h3>
                            <ol className="list-decimal pl-5 space-y-3 text-blue-900">
                                <li>
                                    <strong>Initial HTML Shell:</strong> Server immediately sends the page shell with loading states
                                    <div className="mt-1 text-xs text-gray-600">
                                        Note the page render timestamp shown at the top - this is when the shell was sent
                                    </div>
                                </li>
                                <li>
                                    <strong>Progressive Server Rendering:</strong> Each Suspense boundary resolves independently on the server
                                    <div className="mt-1 text-xs text-gray-600">
                                        No need to wait for all data before sending the first HTML
                                    </div>
                                </li>
                                <li>
                                    <strong>Streaming Updates:</strong> As components finish rendering on the server, they're streamed to the browser
                                    <div className="mt-1 text-xs text-gray-600">
                                        Notice the different timestamps for each component as they arrive
                                    </div>
                                </li>
                                <li>
                                    <strong>Hydration:</strong> The browser seamlessly replaces fallbacks with actual content without full reloads
                                    <div className="mt-1 text-xs text-gray-600">
                                        No client-side data fetching or state management needed
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-blue-200">
                            <h3 className="font-semibold text-blue-700 mb-3">Benefits of Streaming:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-blue-900">
                                <li>
                                    <strong>Faster Time to First Contentful Paint:</strong> Initial UI renders immediately
                                </li>
                                <li>
                                    <strong>Improved User Experience:</strong> Content arrives progressively as it's ready
                                </li>
                                <li>
                                    <strong>Server-side Data Fetching:</strong> No need to fetch data on the client
                                </li>
                                <li>
                                    <strong>Reduced Client-side JavaScript:</strong> Components are pre-rendered on the server
                                </li>
                                <li>
                                    <strong>Better SEO:</strong> Content is part of the initial HTML, not dependent on JS
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}