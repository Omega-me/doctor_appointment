'use client';
import { store } from '@/state/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const ReduxLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxLayout;
