import { DoctorIdPageProps, prefetchQuery } from './DoctorIdPage.utils';
import { DoctorIdModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const DoctorIdPage = async (props: DoctorIdPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorIdModule id={props.params.doctorid} />
    </HydrationBoundary>
  );
};

export default DoctorIdPage;
