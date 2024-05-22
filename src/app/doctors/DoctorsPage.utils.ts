import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface DoctorsPageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: DoctorsPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};