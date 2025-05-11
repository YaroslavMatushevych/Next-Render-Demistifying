import '@/app/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next.js 15 Performance Comparison',
  description: 'Real-world comparison of Next.js 15 rendering strategies',
};

export default function RootLayout({ children }) {
  return (
        <div className="min-h-screen bg-gray-50">
          {/* Navbar */}
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                  Next.js 15 Performance
                </Link>
                <div className="hidden sm:flex gap-4 text-sm font-medium text-gray-600">
                  <Link href="/streaming" className="hover:text-indigo-600">Streaming</Link>
                  <Link href="/server-only" className="hover:text-indigo-600">Server-Only</Link>
                  <Link href="/client-only" className="hover:text-indigo-600">Client-Only</Link>
                  <Link href="/static-only" className="hover:text-indigo-600">Static-Only</Link>
                  <Link href="/isr" className="hover:text-indigo-600">ISR</Link>
                  <Link href="/hybrid" className="hover:text-indigo-600">Hybrid</Link>
                  <Link href="/comparison" className="hover:text-indigo-600">Comparison</Link>
                  <Link href="/benchmark" className="hover:text-indigo-600">Benchmark</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-white mt-8 py-4 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                Next.js 15 Performance Comparison Demo | {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
  );
}
