import { PatientIdModule } from '@/containers/modules';
import { PattientIdPageProps, prefetchQuery } from './PatientIdPage.utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const PattientIdPage = async (props: PattientIdPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PatientIdModule id={props.params.patientid} />
    </HydrationBoundary>
  );
};

export default PattientIdPage;
