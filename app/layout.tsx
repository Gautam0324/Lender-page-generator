import '../src/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LendFlow',
  description: 'Lender Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
