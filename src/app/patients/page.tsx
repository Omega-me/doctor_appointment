import { PatientsPageProps, prefetchQuery } from './PatientsPage.utils';
import { PatientsModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const PatientsPage = async (props: PatientsPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PatientsModule />
    </HydrationBoundary>
  );
};

export default PatientsPage;