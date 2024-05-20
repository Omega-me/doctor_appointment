import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/common/providers';
import '../common/styles/globals.css';

import ClientLayout from './ClientLayout';
import ReduxLayout from './ReduxLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Doctor Appointment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxLayout>
          <QueryProvider>
            <ClientLayout>{children}</ClientLayout>
          </QueryProvider>
        </ReduxLayout>
      </body>
    </html>
  );
}
