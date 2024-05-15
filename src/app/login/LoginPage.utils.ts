import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface LoginPageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: LoginPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};