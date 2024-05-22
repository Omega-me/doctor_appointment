import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface DoctorIdPageProps extends IPageProps {
  params: { doctorid: string };
}

export const prefetchQuery = async (props: DoctorIdPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};