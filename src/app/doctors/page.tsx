import { DoctorsPageProps, prefetchQuery } from './DoctorsPage.utils';
import { DoctorsModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const DoctorsPage = async (props: DoctorsPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsModule />
    </HydrationBoundary>
  );
};

export default DoctorsPage;