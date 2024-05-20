import { LoginPageProps, prefetchQuery } from './LoginPage.utils';
import { LoginModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const LoginPage = async (props: LoginPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LoginModule />
    </HydrationBoundary>
  );
};

export default LoginPage;
