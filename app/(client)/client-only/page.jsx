'use client';

import { useEffect, useState } from 'react';
import {
    fetchStockData,
    fetchWeatherData,
    fetchNewsData,
    fetchCryptoData
} from '@/lib/api-utils';
import dynamic from 'next/dynamic';

// Client components with dynamic imports and no SSR
const StockCardClient = dynamic(() => import('@/components/client/StockCard.client'), { 
  ssr: false,
});
const WeatherCardClient = dynamic(() => import('@/components/client/WeatherCard.client'), { 
  ssr: false,
});
const NewsCardClient = dynamic(() => import('@/components/client/NewsCard.client'), { 
  ssr: false,
});
const CryptoCardClient = dynamic(() => import('@/components/client/CryptoCard.client'), { 
  ssr: false,
});

export default function ClientComponentsPresentation() {
    // State for each data type
    const [stockData, setStockData] = useState(undefined);
    const [weatherData, setWeatherData] = useState(undefined);
    const [newsData, setNewsData] = useState(undefined);
    const [cryptoData, setCryptoData] = useState(undefined);

    // Loading states
    const [stockLoading, setStockLoading] = useState(true);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [cryptoLoading, setCryptoLoading] = useState(true);

    // Track overall app load time
    const [pageLoadTime, setPageLoadTime] = useState(0);
    const startTime = Date.now();

    // Fetch all data on component mount
    useEffect(() => {
        const fetchAllData = async () => {
            // Fetch stock data with simulated delay
            fetchStockData(2000)
                .then(data => {
                    setStockData(data);
                    setStockLoading(false);
                    console.log('Stock data loaded after', (Date.now() - startTime), 'ms');
                });

            // Fetch weather data with simulated delay
            fetchWeatherData(1500)
                .then(data => {
                    setWeatherData(data);
                    setWeatherLoading(false);
                    console.log('Weather data loaded after', (Date.now() - startTime), 'ms');
                });

            // Fetch news data with simulated delay
            fetchNewsData(3000)
                .then(data => {
                    setNewsData(data);
                    setNewsLoading(false);
                    console.log('News data loaded after', (Date.now() - startTime), 'ms');
                });

            // Fetch crypto data with simulated delay
            fetchCryptoData(2500)
                .then(data => {
                    setCryptoData(data);
                    setCryptoLoading(false);
                    console.log('Crypto data loaded after', (Date.now() - startTime), 'ms');
                });
        };

        fetchAllData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <h1 className="text-3xl font-bold text-purple-800 mb-2">Client Components Presentation</h1>
                <p className="mb-6 text-gray-600">
                    This page demonstrates client-side rendering patterns in Next.js.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stock Data */}
                    <div className="relative">
                        <StockCardClient data={stockData} loading={stockLoading} />
                        <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                            Client Component with dynamic import
                        </div>
                    </div>

                    {/* Weather Data */}
                    <div className="relative">
                        <WeatherCardClient data={weatherData} loading={weatherLoading} />
                        <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                            Client Component with dynamic import
                        </div>
                    </div>

                    {/* News Data */}
                    <div className="relative">
                        <NewsCardClient data={newsData} loading={newsLoading} />
                        <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                            Client Component with dynamic import
                        </div>
                    </div>

                    {/* Crypto Data */}
                    <div className="relative">
                        <CryptoCardClient data={cryptoData} loading={cryptoLoading} />
                        <div className="absolute top-2 right-2 text-xs bg-blue-100 rounded px-2 py-1">
                            Client Component with dynamic import
                        </div>
                    </div>
                </div>

                {/* Explanations for the presentation */}
                <div className="mt-8 space-y-6">
                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h2 className="font-bold text-xl text-purple-800 mb-3">Understanding Client Components</h2>
                        <div className="space-y-4">
                            <p className="text-purple-900">
                                <strong>What are Client Components?</strong> Client Components in Next.js are React components 
                                that run in the browser. They're marked with the <code className="bg-purple-100 px-1 rounded">'use client'</code> directive 
                                at the top of the file.
                            </p>
                            
                            <div className="bg-white p-4 rounded border border-purple-200">
                                <h3 className="font-semibold text-purple-700 mb-2">Key Characteristics:</h3>
                                <ul className="list-disc pl-5 space-y-1 text-purple-900">
                                    <li>Run completely on the client-side (browser)</li>
                                    <li>Can use browser APIs, hooks, and event listeners</li>
                                    <li>Support interactivity and state management</li>
                                    <li>Must wait for JavaScript to load before rendering</li>
                                    <li>Increase the client-side JavaScript bundle size</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="font-bold text-xl text-blue-800 mb-3">NoSSR Wrapper for Client Components</h2>
                        <div className="space-y-4">
                            <p className="text-blue-900">
                                In this demo, we're using <code className="bg-blue-100 px-1 rounded">next/dynamic</code> to create a NoSSR wrapper 
                                that prevents our client components from running on the server:
                            </p>
                            
                            <div className="bg-white p-4 rounded border border-blue-200 text-blue-900">
                                <div className="mb-3">
                                    <pre className="bg-blue-50 p-2 block rounded overflow-x-auto">
                                    <code>
{`const StockCardClient = dynamic(() => import('@/components/client/StockCard.client'), { 
  ssr: false,
  loading: () => <div>Loading Stock Data...</div>
});`}
                                    </code>
                                    </pre>
                                </div>
                                <p className="mb-2 text-sm italic">How the NoSSR wrapper works under the hood:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Import syntax hack:</strong> For named exports, a .then() callback with "default" mapping is needed</li>
                                    <li><strong>ssr: false:</strong> Prevents the component from rendering during server-side rendering</li>
                                    <li><strong>React.lazy():</strong> Internally uses React.lazy() to dynamically load the component</li>
                                    <li><strong>loading:</strong> Shows a fallback UI that appears in the initial HTML</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h2 className="font-bold text-xl text-yellow-800 mb-3">Server Components as Children of Client Components</h2>
                        <div className="space-y-4">
                            <p className="text-yellow-900">
                                A common source of confusion: How can a client component contain a server component?
                            </p>
                            
                            <div className="bg-white p-4 rounded border border-yellow-200 text-yellow-900">
                                <div className="mb-3">
                                    <pre className="bg-yellow-50 p-2 block rounded overflow-x-auto">
                                    <code>
{`// JSX usage
<ClientComponent>
  <ServerComponent/>
</ClientComponent>

// ClientComponent.js
'use client'
export const ClientComponent = ({children}) => {
  return <div className="box client-component">
    This is a Client-Side Component and this is its {"{children}"}:
    {children}
  </div>
}

// ServerComponent.js
export const ServerComponent = () => 
  <div className="box">Server Component content</div>;`}
                                    </code>
                                    </pre>
                                </div>
                                
                                <h3 className="font-semibold mb-2">What's actually happening:</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>The server runs <code className="bg-yellow-100 px-1">ServerComponent</code> at request-time, on the server</li>
                                    <li>The <code className="bg-yellow-100 px-1">ClientComponent</code> is inserted into the Virtual DOM as a client component</li>
                                    <li>The <code className="bg-yellow-100 px-1">children</code> property is set to the <strong>static HTML output</strong> of the ServerComponent</li>
                                    <li>When ClientComponent runs in the browser, it simply inserts its <code className="bg-yellow-100 px-1">children</code> content</li>
                                    <li>ClientComponent doesn't know or care that its children were generated by a Server Component!</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h2 className="font-bold text-xl text-green-800 mb-3">The "Box" Mental Model</h2>
                        <div className="space-y-4">
                            <p className="text-green-900">
                                To understand Client and Server Components, think of the Client Component as a box:
                            </p>
                            
                            <div className="bg-white p-4 rounded border border-green-200">
                                <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                                    <div className="flex-1 border-2 border-dashed border-green-300 p-4 text-center">
                                        <div className="text-sm text-green-600 font-bold mb-2">CLIENT COMPONENT (Box)</div>
                                        <div className="border border-green-200 bg-green-50 p-4">
                                            <div className="text-sm text-green-600">SERVER COMPONENT (Content)</div>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-green-900 text-sm">
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>ClientComponent <strong>doesn't need to run</strong> ServerComponent!</li>
                                            <li>The box knows nothing about what's inside it</li>
                                            <li>ServerComponent was already executed on the server</li>
                                            <li>Its output is passed as static content to ClientComponent</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="text-green-900 border-t border-green-100 pt-3">
                                    <p><strong>Important:</strong> The ClientComponent can't control the ServerComponent at runtime. 
                                    If the ClientComponent changes state, it can't cause the ServerComponent to re-render with different props.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                        <h2 className="font-bold text-xl text-red-800 mb-3">Importing vs Nesting Components</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded border border-red-200 text-red-900">
                                <h3 className="font-semibold mb-2">The One Rule To Remember:</h3>
                                <p className="p-2 bg-red-50 border border-red-100 font-medium">
                                    The deciding factor for what is treated as a Client Component is what is imported in the code, 
                                    not how components are nested in the JSX.
                                </p>
                                
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-red-700 mb-2">What Works:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Server Component as <code className="bg-red-50 px-1">children</code> of Client Component</li>
                                            <li>Server Component's output passed as props to Client Component</li>
                                            <li>Importing Client Components into Server Components</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-red-700 mb-2">What Doesn't Work:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Importing a Server Component into a Client Component</li>
                                            <li>Passing server-only functions as props to Client Components</li>
                                            <li>Client-side control of a Server Component's rendering</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h2 className="font-bold text-xl text-indigo-800 mb-3">Client-Side Data Fetching Flow</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded border border-indigo-200">
                                <ol className="list-decimal pl-5 space-y-2 text-indigo-900">
                                    <li><strong>Initial Render:</strong> Empty shell with loading states</li>
                                    <li><strong>Hydration:</strong> JavaScript takes over the page</li>
                                    <li><strong>useEffect:</strong> Triggers data fetching after hydration</li>
                                    <li><strong>Loading States:</strong> Show while waiting for data</li>
                                    <li><strong>Data Arrival:</strong> Components update with real data</li>
                                </ol>
                            </div>
                            
                            <p className="text-indigo-900">
                                Notice that each API request has a different simulated delay (1500ms to 3000ms), 
                                causing components to load at different times. This waterfall pattern is typical 
                                in client-side rendering.
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h2 className="font-bold text-xl text-purple-800 mb-3">React Suspense and NoSSR Behind the Scenes</h2>
                        <div className="space-y-4">
                            <p className="text-purple-900">
                                Under the hood, <code className="bg-purple-100 px-1 rounded">next/dynamic</code> with <code className="bg-purple-100 px-1 rounded">ssr: false</code> generates 
                                a Virtual DOM structure that looks like:
                            </p>
                            
                            <div className="bg-white p-4 rounded border border-purple-200 font-mono text-sm text-purple-900 overflow-x-auto">
                                <pre className="bg-purple-50 p-2 rounded">
{`// Simplified representation of the generated Virtual DOM:
c:"$Sreact.suspense"
["$","$c",null,{
  "fallback":["$","div",null,{"className":"client-component","children":"Loading..."}],
  "children":["$","$Ld",null,{"children":"$Le"}]
}]`}
                                </pre>
                                
                                <div className="mt-3 text-sm">
                                    <ol className="list-decimal pl-5 space-y-1">
                                        <li>React Suspense component with a fallback (loading state)</li>
                                        <li>NoSSR wrapper that prevents server rendering</li>
                                        <li>Dynamic import of the actual Client Component</li>
                                        <li>Client Component gets rendered once the import resolves</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h2 className="font-bold text-xl text-orange-800 mb-3">Best Practices for Client/Server Components</h2>
                        <div className="bg-white p-4 rounded border border-orange-200">
                            <ul className="list-disc pl-5 space-y-1 text-orange-900">
                                <li><strong>Limit client components</strong> to where interactivity is needed</li>
                                <li><strong>Use Server Components</strong> for static or server-rendered content</li>
                                <li><strong>Avoid importing</strong> Server Components into Client Components</li>
                                <li><strong>Do pass Server Components as children</strong> to Client Components</li>
                                <li><strong>Implement skeleton screens</strong> during loading for better UX</li>
                                <li><strong>Be mindful of the boundary</strong> between client and server code</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>Presentation created for team: {new Date().toLocaleDateString()}</p>
                    <p>Page rendered client-side with dynamic imports and delayed data loading</p>
                </div>
            </div>
        </div>
    );
}