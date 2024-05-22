import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface AppointmentIdPageProps extends IPageProps {
  params: { appointmentid: string };
}

export const prefetchQuery = async (props: AppointmentIdPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();
    
  return queryClient;
};