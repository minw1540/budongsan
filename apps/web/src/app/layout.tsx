import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '나만의 스마트 부동산 시트',
  description: '현명한 부동산 결정을 위한 당신의 파트너',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 