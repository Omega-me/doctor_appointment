import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface ProfilePageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: ProfilePageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};