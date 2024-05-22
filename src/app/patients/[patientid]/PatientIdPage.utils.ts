import { IPageProps } from '@/common/interfaces';
import { QueryClient } from '@tanstack/react-query';

export interface PattientIdPageProps extends IPageProps {
  params: { patientid: string };
}

export const prefetchQuery = async (props: PattientIdPageProps): Promise<QueryClient> => {
  const queryClient = new QueryClient();

  return queryClient;
};
