import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IMutationOpts, IQueryOpts } from '@/common/interfaces';
import { generatUrlAndKeys } from '@/common/utils';
import { httpClient } from '@/services';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 *
 * @param opts
 */
export const prefetchPatient = async <TData,>(opts: { queryClient: QueryClient; config?: IQueryOpts<TData> }) => {
  const route = eApiRoutes.PATIENTS;

  const { url, keys, axiosConfig } = generatUrlAndKeys({
    config: opts.config,
    keys: [route],
    url: route,
  });

  await opts.queryClient.prefetchQuery({
    queryKey: keys,
    queryFn: () =>
      httpClient(eHttpMethod.GET, url, {
        axiosConfig,
        message: opts.config?.httpConfig?.message,
        ...opts.config?.httpConfig,
      }),
    ...opts?.config?.queryConfig,
  });
};

/**
 *
 * @param opts
 * @returns
 */
export const usePatientQuery = <TData,>(opts?: IQueryOpts<TData>) => {
  const queryClient = useQueryClient();
  const route = eApiRoutes.PATIENTS;

  const { url, keys, axiosConfig } = generatUrlAndKeys<TData>({
    config: opts,
    keys: [route],
    url: route,
  });

  const { data, ...query } = useQuery({
    queryKey: keys,
    queryFn: () =>
      httpClient(eHttpMethod.GET, url, {
        axiosConfig,
        message: opts?.httpConfig?.message,
        ...opts?.httpConfig,
      }),
    ...opts?.queryConfig,
  });

  const getCachedData = <TData,>(): TData | undefined => {
    return queryClient.getQueryData(keys);
  };

  return {
    data: data as TData,
    getCachedData,
    ...query,
  };
};

/**
 *
 * @param opts
 */
export const usePatientMutation = <TData,>(opts?: IMutationOpts<TData>) => {
  const queryClient = useQueryClient();
  const route = eApiRoutes.PATIENTS;
  const { url, keys, axiosConfig, methode, hasInvalidation, hasErrorHandling } = generatUrlAndKeys<TData>({
    config: opts,
    keys: [route],
    url: route,
    isMuatation: true,
  });

  const mutation = useMutation({
    mutationKey: keys,
    mutationFn: (variables: TData) =>
      httpClient<TData>(methode as eHttpMethod, url, {
        data: variables,
        axiosConfig,
        message: opts?.httpConfig?.message,
        ...opts?.httpConfig,
      }),
    onSuccess(data, variables, context) {
      if (hasInvalidation) {
        queryClient.invalidateQueries({
          queryKey: [route],
        });
      }
      if (opts?.queryConfig?.onSuccessFn) {
        opts?.queryConfig?.onSuccessFn(data, variables, context);
      }
    },
    onError(error, variables, context) {
      if (hasErrorHandling) {
        // Do something with the error
      }
      if (opts?.queryConfig?.onErrorFn) {
        opts?.queryConfig?.onErrorFn(error, variables, context);
      }
    },
    ...opts?.queryConfig,
  });

  const getCachedData = <TData,>(): TData | undefined => {
    return queryClient.getQueryData(keys);
  };

  return {
    ...mutation,
    getCachedData,
  };
};
