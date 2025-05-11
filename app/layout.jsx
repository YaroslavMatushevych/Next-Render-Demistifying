import '@/app/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Next.js 15 Render Demistifying',
    description: 'Real-world examples of Next.js 15 rendering strategies',
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}