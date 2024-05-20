import { ProfilePageProps, prefetchQuery } from './ProfilePage.utils';
import { ProfileModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const ProfilePage = async (props: ProfilePageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileModule />
    </HydrationBoundary>
  );
};

export default ProfilePage;