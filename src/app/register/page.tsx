import { RegisterPageProps, prefetchQuery } from './RegisterPage.utils';
import { RegisterModule } from '@/containers/modules';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const RegisterPage = async (props: RegisterPageProps) => {
  const queryClient = await prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RegisterModule />
    </HydrationBoundary>
  );
};

export default RegisterPage;