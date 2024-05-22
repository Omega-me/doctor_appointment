import { AppointmentIdPageProps, prefetchQuery } from './AppointmentIdPage.utils';
import { AppointmentIdModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const AppointmentIdPage = async (props: AppointmentIdPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentIdModule id={props.params.appointmentid} />
    </HydrationBoundary>
  );
};

export default AppointmentIdPage;
