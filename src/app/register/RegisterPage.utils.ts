import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface RegisterPageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: RegisterPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};