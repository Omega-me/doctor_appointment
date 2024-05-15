import { UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { eHttpMethod } from 'common/enums';
import { useQuery } from '@tanstack/react-query';

// custom axios config interface
interface IAxiosConfig extends AxiosRequestConfig {
  hasAuth?: boolean;
}
// htpp config interface for axios service
export interface IHttpConfig<TData = unknown> {
  data?: TData;
  axiosConfig?: IAxiosConfig;
  message?: string;
}

// http config interface for react query
export interface IQueryHttpConfig {
  axiosConfig?: IAxiosConfig;
  message?: string;
  methode?: eHttpMethod;
}

// Axios response interface
export interface IResponse<TData = unknown> {
  data: TData | null;
  count?: number | null;
  status: string;
}

// Query interfaces
interface IQueryConfig extends Omit<UseQueryOptions<TData, any, any, any>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  queryParam?: string;
  queryString?: string;
  queryUrl?: string;
  showError?: boolean;
}
export interface IQueryOpts<TData = unknown> {
  httpConfig?: IQueryHttpConfig;
  queryConfig?: IQueryConfig;
}

// Mutation interfaces
interface IMutationConfig extends Omit<UseMutationOptions<TData, any, any, any>, 'mutationFn'> {
  queryKey?: QueryKey;
  queryParam?: string;
  queryString?: string;
  queryUrl?: string;
  showError?: boolean;
  defaultInvalidation?: boolean;
  hasInvalidation?: boolean;
  hasErrorHandling?: boolean;
  onSuccessFn?: (data: any, variables: TData, context: any) => void;
  onErrorFn?: (error?: any, variables?: TData, context?: any) => void;
}

export interface IMutationOpts<TData = unknown> {
  httpConfig?: IQueryHttpConfig;
  queryConfig?: IMutationConfig;
}
