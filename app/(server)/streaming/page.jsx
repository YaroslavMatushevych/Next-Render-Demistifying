import React, { Suspense } from 'react';
import StockCard from '@/components/server/StockCard.server';
import WeatherCard from '@/components/server/WeatherCard.server';
import { fetchStockData, fetchWeatherData } from '@/lib/api-utils';


export const dynamic = 'force-dynamic';

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

const StreamingArchitecture = () => {
    return (
        <div className="mt-12">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
                <h2 className="font-bold text-2xl text-blue-800 mb-3">React Streaming: What Actually Happens</h2>

                {/* Real-world example section */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">The Problem Streaming Solves</h3>

                    <div className="mb-6 border-l-4 border-amber-500 pl-4 py-2 bg-amber-50">
                        <p className="text-amber-800 font-medium">Without streaming, we face a common scenario:</p>
                        <p className="text-amber-700 mt-1">
                            Your dashboard needs data from 5 different APIs. The slowest one takes 3 seconds.
                            The entire page is blocked for 3 full seconds before users see anything at all.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 border rounded-lg p-4 bg-red-50 border-red-200">
                            <div className="font-medium text-red-700 mb-2">Traditional Rendering (Blocked)</div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-full bg-red-200 rounded">
                                    <div className="h-3 w-full bg-red-400 rounded animate-pulse"></div>
                                </div>
                                <span className="text-xs text-red-600">3s</span>
                            </div>
                            <p className="text-red-700 text-sm mt-3">
                                User waits with a blank page or spinner until ALL data is ready.
                            </p>
                        </div>

                        <div className="flex-1 border rounded-lg p-4 bg-green-50 border-green-200">
                            <div className="font-medium text-green-700 mb-2">Streaming (Progressive)</div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-full bg-green-200 rounded">
                                        <div className="h-2 w-full bg-green-500 rounded"></div>
                                    </div>
                                    <span className="text-xs text-green-700">0s</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-full bg-green-200 rounded">
                                        <div className="h-2 w-3/4 bg-green-500 rounded"></div>
                                    </div>
                                    <span className="text-xs text-green-700">0.5s</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-full bg-green-200 rounded">
                                        <div className="h-2 w-1/2 bg-green-500 rounded"></div>
                                    </div>
                                    <span className="text-xs text-green-700">1s</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-full bg-green-200 rounded">
                                        <div className="h-2 w-1/4 bg-green-500 rounded"></div>
                                    </div>
                                    <span className="text-xs text-green-700">3s</span>
                                </div>
                            </div>
                            <p className="text-green-700 text-sm mt-3">
                                User sees UI immediately, with content arriving as it's ready.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stock/Weather Card Example */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">Streaming Cards in Action</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Stock Card */}
                        <Suspense fallback={<LoadingCard label="Stock Component Streaming" />}>
                            <StreamingCard
                                label="Server Component + Suspense"
                                fetcher={fetchStockData}
                                Component={StockCard}
                                delay={3500}
                            />
                        </Suspense>

                        <Suspense fallback={<LoadingCard label="Weather Component Streaming" />}>
                            <StreamingCard
                                label="Server Component + Suspense"
                                fetcher={fetchWeatherData}
                                Component={WeatherCard}
                                delay={2500}
                            />
                        </Suspense>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                        <p>These components stream in independently. Notice the different render timestamps because each component resolves as soon as its data is ready.</p>
                    </div>
                </div>

                {/* Code example section */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">Streaming In Action: A Real Example</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="text-gray-700 font-medium mb-2">Before: Blocking Page-Level Data</div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`// pages/dashboard.js
export async function getServerSideProps() {
  // Blocks EVERYTHING until all data is ready
  const stocks = await fetchStockData();
  const weather = await fetchWeatherData();
  const news = await fetchNewsData();
  
  return { props: { stocks, weather, news } };
}

function Dashboard({ stocks, weather, news }) {
  return (
    <div>
      <StockCard data={stocks} />
      <WeatherCard data={weather} />
      <NewsCard data={news} />
    </div>
  );
}`}
                            </pre>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="text-gray-700 font-medium mb-2">After: Streaming with Server Components</div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`// app/dashboard/page.js
export const dynamic = 'force-dynamic';

export default function Dashboard() {
  return (
    <div>
      {/* UI shell displays immediately */}
      <Suspense fallback={<StockCardSkeleton />}>
        <StockCardServer />
      </Suspense>
      
      <Suspense fallback={<WeatherCardSkeleton />}>
        <WeatherCardServer />
      </Suspense>
      
      <Suspense fallback={<NewsCardSkeleton />}>
        <NewsCardServer />
      </Suspense>
    </div>
  );
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                        <div className="text-gray-700 font-medium mb-2">Server Component Implementation</div>
                        <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                            {`// components/StockCardServer.js
async function StockCardServer() {
  // This API call doesn't block the WHOLE page
  // Only this component waits for its own data
  const stockData = await fetchStockData();
  
  return (
    <div className="card">
      <h2>Stock Updates</h2>
      <div className="stock-info">
        {stockData.map(stock => (
          <div key={stock.symbol}>
            <span>{stock.symbol}</span>
            <span>{stock.price}</span>
            <span className={stock.change > 0 ? 'up' : 'down'}>
              {stock.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                        </pre>
                    </div>
                </div>

                {/* Practical explainer section */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 shadow-sm mb-6">
                    <h3 className="font-semibold text-blue-700 mb-3">How to Use Streaming Effectively</h3>

                    <div className="space-y-6">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">1</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Prioritize Critical Content First</h4>
                                <p className="text-blue-700 mt-1">
                                    The navigation, header, and main layout should render instantly. Put interactive controls that users can see right away.
                                </p>
                                <div className="mt-2 text-sm bg-blue-50 border-l-4 border-blue-400 pl-3 py-2">
                                    <p><span className="font-medium">Example:</span> For an e-commerce product page, show the product image and "Add to Cart" button immediately, while specs and reviews can stream in later.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">2</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Design Meaningful Loading States</h4>
                                <p className="text-blue-700 mt-1">
                                    Don't use generic spinners. Create component-specific skeletons that match the actual content shape.
                                </p>
                                <div className="mt-2 text-sm bg-blue-50 border-l-4 border-blue-400 pl-3 py-2">
                                    <p><span className="font-medium">Example:</span> For a news card, show placeholder headline lines and image frames that match the final layout, helping users anticipate what's coming.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">3</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Parallel vs. Sequential Loading</h4>
                                <p className="text-blue-700 mt-1">
                                    Carefully consider the nesting of your Suspense boundaries - it affects the loading sequence.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div className="text-sm bg-blue-50 border-l-4 border-blue-400 pl-3 py-2">
                                        <p><span className="font-medium">Sequential (Waterfall):</span></p>
                                        <pre className="mt-1 text-xs bg-gray-800 text-green-300 p-2 rounded">
                                            {`<Suspense fallback={<OuterFallback />}>
  <SlowComponent1 />
  <Suspense fallback={<InnerFallback />}>
    <SlowComponent2 />
  </Suspense>
</Suspense>`}
                                        </pre>
                                        <p className="mt-1">Component2 won't even start loading until Component1 is done.</p>
                                    </div>
                                    <div className="text-sm bg-blue-50 border-l-4 border-blue-400 pl-3 py-2">
                                        <p><span className="font-medium">Parallel:</span></p>
                                        <pre className="mt-1 text-xs bg-gray-800 text-green-300 p-2 rounded">
                                            {`<Suspense fallback={<Fallback1 />}>
  <SlowComponent1 />
</Suspense>

<Suspense fallback={<Fallback2 />}>
  <SlowComponent2 />
</Suspense>`}
                                        </pre>
                                        <p className="mt-1">Both components load in parallel, independently.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">4</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Edge Rendering for Global Performance</h4>
                                <p className="text-blue-700 mt-1">
                                    Deploy streaming components to edge locations worldwide to minimize latency.
                                </p>
                                <div className="mt-2 text-sm bg-blue-50 border-l-4 border-blue-400 pl-3 py-2">
                                    <p><span className="font-medium">Real case:</span> A news site implemented streaming with edge rendering and saw 60% faster load times for users across continents - the page shell comes from nearby edge servers while content streams from global APIs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* App Router Special Files Section */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">App Router Special Files for Streaming</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">loading.js</span>
                                <span>Automatic Loading UI</span>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`// app/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}`}
                            </pre>
                            <p className="text-gray-600 text-sm mt-3">
                                This file automatically creates a loading UI that shows while the page is loading.
                                It's a built-in Suspense boundary around your page component.
                            </p>
                        </div>

                        <div className="flex flex-col justify-between bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div>
                                <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">error.js</span>
                                    <span>Component-Level Error Handling</span>
                                </div>
                                <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                    {`// app/dashboard/error.js
"use client";

export default function DashboardError({ 
  error, 
  reset 
}) {
  return (
    <div className="p-4 border border-red-300 rounded bg-red-50">
      <h2 className="text-red-800 font-medium mb-2">
        Failed to load dashboard
      </h2>
      <p className="text-red-700 mb-4">
        {error.message || "Something went wrong"}
      </p>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-red-700 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}`}
                                </pre>
                                <p className="text-gray-600 text-sm mt-3">
                                    Error boundaries catch errors in specific parts of your UI without crashing the whole app.
                                    The reset() function lets users retry the failed operation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">layout.js</span>
                                <span>Persistent UI Across Routes</span>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        {/* Navigation here - rendered ONCE */}
        <nav>...</nav>
      </div>
      
      <div className="main-content">
        {/* Children change while layout persists */}
        {children}
      </div>
    </div>
  );
}`}
                            </pre>
                            <p className="text-gray-600 text-sm mt-3">
                                Layouts persist between routes and maintain state, keeping shared elements like navigation
                                visible while only the changing parts re-render.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">template.js</span>
                                <span>UI That Remounts on Navigation</span>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`// app/dashboard/template.js
export default function DashboardTemplate({ children }) {
  return (
    <div className="transition-wrapper">
      {/* Unlike layout, this remounts on each navigation */}
      {/* Great for animations between routes */}
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
}`}
                            </pre>
                            <p className="text-gray-600 text-sm mt-3">
                                Unlike layouts, templates create a new instance on each route change.
                                Perfect for entrance animations or effects that should restart on navigation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pages vs App Router Comparison */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">Pages Router vs App Router: Key Differences</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="border border-blue-200 p-3 text-left text-blue-800">Feature</th>
                                    <th className="border border-blue-200 p-3 text-left text-blue-800">Pages Router</th>
                                    <th className="border border-blue-200 p-3 text-left text-blue-800">App Router</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Routing Structure</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        <code className="bg-gray-100 px-1 rounded">/pages/blog/[id].js</code>
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        <code className="bg-gray-100 px-1 rounded">/app/blog/[id]/page.js</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Data Fetching</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        <code className="bg-gray-100 px-1 rounded">getServerSideProps</code>, <code className="bg-gray-100 px-1 rounded">getStaticProps</code>
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Direct <code className="bg-gray-100 px-1 rounded">async/await</code> in components
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Loading States</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Custom implementation required
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Built-in with <code className="bg-gray-100 px-1 rounded">loading.js</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Layout Patterns</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Single <code className="bg-gray-100 px-1 rounded">_app.js</code> for global layout
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Nested <code className="bg-gray-100 px-1 rounded">layout.js</code> files
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Error Handling</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Global <code className="bg-gray-100 px-1 rounded">_error.js</code>
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Nested <code className="bg-gray-100 px-1 rounded">error.js</code> boundaries
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Component Types</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Client Components only
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Server + Client Components
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">Streaming</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Not natively supported
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Built-in with Suspense
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-200 p-3 font-medium text-blue-900">SEO Management</td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        <code className="bg-gray-100 px-1 rounded">next/head</code> component
                                    </td>
                                    <td className="border border-blue-200 p-3 text-gray-700">
                                        Metadata API via <code className="bg-gray-100 px-1 rounded">metadata.js</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-3">Special Files in App Router</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">page.js</div>
                                <p className="text-sm text-gray-600">The UI for a route. Makes the path publicly accessible.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">layout.js</div>
                                <p className="text-sm text-gray-600">Shared UI for a segment and its children. Preserves state.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">loading.js</div>
                                <p className="text-sm text-gray-600">Loading UI for a segment. Automatic Suspense boundary.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">error.js</div>
                                <p className="text-sm text-gray-600">Error UI for a segment. Automatic error boundary.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">not-found.js</div>
                                <p className="text-sm text-gray-600">UI for 404 errors within a segment.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">template.js</div>
                                <p className="text-sm text-gray-600">Similar to layout but creates a new instance on navigation.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">route.js</div>
                                <p className="text-sm text-gray-600">Server-side API endpoint for a route.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">middleware.js</div>
                                <p className="text-sm text-gray-600">Runs before requests are completed. For auth, redirects, etc.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                                <div className="font-medium text-blue-800 mb-1">default.js</div>
                                <p className="text-sm text-gray-600">Fallback UI for parallel routes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Practical Migration Path */}
                <div className="bg-white p-5 rounded-lg border border-blue-200 shadow-sm">
                    <h3 className="font-semibold text-blue-700 mb-3">Practical Migration Path: Pages to App Router</h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">1</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Start with Parallel Routing</h4>
                                <p className="text-blue-700 text-sm mt-1">
                                    Use both /pages and /app directories simultaneously, migrating routes one by one.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">2</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Convert Data Fetching</h4>
                                <p className="text-blue-700 text-sm mt-1">
                                    Replace getServerSideProps/getStaticProps with async/await directly in your components.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">3</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Implement Streaming</h4>
                                <p className="text-blue-700 text-sm mt-1">
                                    Add Suspense boundaries around data-dependent components for progressive loading.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">4</div>
                            <div>
                                <h4 className="font-medium text-blue-800">Add Special Files</h4>
                                <p className="text-blue-700 text-sm mt-1">
                                    Enhance UX with loading.js, error.js, and other special files that improve the experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="text-amber-800 font-medium mb-2">Real-World Results</h4>
                        <p className="text-amber-700 text-sm">
                            Companies that have migrated from Pages Router to App Router with streaming have reported:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-amber-700 list-disc pl-5">
                            <li>Faster perceived load times</li>
                            <li>Reduction in page abandonment</li>
                            <li>Decrease in server load</li>
                            <li>Better Core Web Vitals scores</li>
                            <li>Improved SEO rankings due to faster delivery</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamingArchitecture;