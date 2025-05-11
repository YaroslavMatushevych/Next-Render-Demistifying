import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-6 sm:p-12">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={24}
            className="dark:invert"
            priority
          />
          <span className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
            Next.js 15 + App Router
          </span>
        </div>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-4 hover:text-blue-600"
        >
          Deploy to Vercel
        </a>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center gap-6 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Welcome to your <span className="text-blue-600">Next.js</span> App
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          This is a clean starting point with Tailwind CSS, server and client
          components, dynamic imports, and streaming support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="/streaming"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            Streaming Demo
          </a>
          <a
            href="/client"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm rounded-lg font-medium transition"
          >
            Client Components
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-gray-400 text-center border-t pt-6 mt-8">
        Built with ❤️ using Next.js 15, Tailwind CSS and App Router —{" "}
        <a
          href="https://nextjs.org/docs"
          className="underline hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Docs
        </a>
      </footer>
    </div>
  );
}
