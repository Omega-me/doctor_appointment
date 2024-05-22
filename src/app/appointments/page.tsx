import { AppointmentsPageProps, prefetchQuery } from './AppointmentsPage.utils';
import { AppointmentsModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const AppointmentsPage = async (props: AppointmentsPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentsModule />
    </HydrationBoundary>
  );
};

export default AppointmentsPage;