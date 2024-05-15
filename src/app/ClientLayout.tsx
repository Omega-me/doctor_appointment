'use client';
import React from 'react';
import s from './page.module.scss';
import { useRouter } from 'next/navigation';
import { eApiRoutes } from '@/common/enums';

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return <div>{children}</div>;
};

export default ClientLayout;
