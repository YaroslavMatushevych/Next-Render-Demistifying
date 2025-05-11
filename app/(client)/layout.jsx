'use client'

import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}) {
    return (
        // <html lang="en">
        //     <body className={inter.className}>
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link href="/" className="text-xl font-bold text-indigo-600">
                                            Next.js 15 Performance
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                        <Link href="/streaming" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Streaming
                                        </Link>
                                        <Link href="/server-only" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Server-Only
                                        </Link>
                                        <Link href="/client-only" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Client-Only
                                        </Link>
                                        <Link href="/comparison" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Comparison
                                        </Link>
                                        <Link href="/benchmark" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Benchmark
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main>{children}</main>
                    <footer className="bg-white mt-8 py-4 shadow-inner">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm text-gray-500">
                                Next.js 15 Performance Comparison Demo | {new Date().getFullYear()}
                            </p>
                        </div>
                    </footer>
                </div>
            // </body>
        // </html>
    );
}