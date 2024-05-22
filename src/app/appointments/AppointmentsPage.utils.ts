import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface AppointmentsPageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: AppointmentsPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};