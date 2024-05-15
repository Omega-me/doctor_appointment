import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { QueryProvider } from '@/common/providers';
import '@mantine/core/styles.css';
import '../common/styles/globals.css';

import ClientLayout from './ClientLayout';

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
        <QueryProvider>
          <MantineProvider>
            <ClientLayout>{children}</ClientLayout>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
