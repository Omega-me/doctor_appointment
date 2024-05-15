'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { eApiRoutes } from '@/common/enums';
import s from './page.module.scss';

const defaultTheme = createTheme({});

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div> {children}</div>
    </ThemeProvider>
  );
};

export default ClientLayout;
