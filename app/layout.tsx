import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NotYet — Decisions, remembered',
  description: 'A living decision watchlist for ideas that are not yet ready.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
