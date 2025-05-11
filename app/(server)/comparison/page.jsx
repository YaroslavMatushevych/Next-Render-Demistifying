import Link from 'next/link';

export default function ComparisonPage() {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <h1 className="heading">Side-by-Side Comparison</h1>
                <p className="mb-6 text-gray-600">
                    Compare the three rendering strategies in real-time by viewing them side by side in separate browser tabs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-indigo-50 p-6 rounded-lg">
                        <h2 className="font-bold text-xl text-indigo-800 mb-3">Streaming Rendering</h2>
                        <p className="text-indigo-900 mb-4">
                            Uses React Server Components with Suspense for streamed progressive rendering.
                            Each component loads independently.
                        </p>
                        <ul className="text-sm space-y-2 mb-4">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Progressive content loading
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Early UI feedback
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                SEO friendly with server rendering
                            </li>
                        </ul>
                        <Link href="/streaming" target="_blank" className="btn inline-block">
                            Open in New Tab
                        </Link>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                        <h2 className="font-bold text-xl text-green-800 mb-3">Server-Only Rendering</h2>
                        <p className="text-green-900 mb-4">
                            Traditional server-side rendering where the server fetches all data before sending HTML to the client.
                        </p>
                        <ul className="text-sm space-y-2 mb-4">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Complete content on first paint
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                SEO friendly
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Longer TTFB (Time to First Byte)
                            </li>
                        </ul>
                        <Link href="/server-only" target="_blank" className="btn bg-green-600 hover:bg-green-700 inline-block">
                            Open in New Tab
                        </Link>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                        <h2 className="font-bold text-xl text-purple-800 mb-3">Client-Only Rendering</h2>
                        <p className="text-purple-900 mb-4">
                            Client-side rendering where all data is fetched in the browser after JavaScript loads.
                        </p>
                        <ul className="text-sm space-y-2 mb-4">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Fast initial page load
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Longer time until meaningful content
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Poor SEO without extra measures
                            </li>
                        </ul>
                        <Link href="/client-only" target="_blank" className="btn bg-purple-600 hover:bg-purple-700 inline-block">
                            Open in New Tab
                        </Link>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h2 className="font-bold text-xl text-blue-800 mb-3">Key Takeaways</h2>
                    <ul className="space-y-3">
                        <li className="flex">
                            <span className="text-blue-700 mr-2">•</span>
                            <span><strong>Streaming</strong> provides the best user experience by progressively rendering content as it becomes available.</span>
                        </li>
                        <li className="flex">
                            <span className="text-blue-700 mr-2">•</span>
                            <span><strong>Server-Only</strong> is great for SEO and provides complete content on first paint, but can have longer initial load times.</span>
                        </li>
                        <li className="flex">
                            <span className="text-blue-700 mr-2">•</span>
                            <span><strong>Client-Only</strong> is simple to implement but has drawbacks for SEO and initial content display.</span>
                        </li>
                        <li className="flex">
                            <span className="text-blue-700 mr-2">•</span>
                            <span>Next.js 15 makes it easy to mix and match these approaches as needed for different parts of your application.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}