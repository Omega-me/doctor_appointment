import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface PatientsPageProps extends IPageProps {
  
}

export const prefetchQuery = async (props: PatientsPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};