import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GlobalProtector from '@/components/GlobalProtector';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Thomasche Blog',
    template: '%s | Thomasche Blog',
  },
  description: '车明强的个人博客 - Che Mingqiang Personal Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 `}
      >
        <GlobalProtector />
        {children}
      </body>
    </html>
  );
}
