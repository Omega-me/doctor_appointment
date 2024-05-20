import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MutationKey, QueryKey } from '@tanstack/react-query';
import { IMutationOpts, IQueryOpts } from '../interfaces';
import { AxiosRequestConfig } from 'axios';
import { eHttpMethod, eRoutes, eStatusCode } from '../enums';
import { NextResponse } from 'next/server';
import { DecodedTokenDTO, UserDTO } from '../dto';
import { user_role } from '@prisma/client';

/**
 *
 * @param opts
 * @returns
 */
export const generatUrlAndKeys = <TData>(opts: {
  config?: IQueryOpts<TData> | IMutationOpts<TData>;
  url: string;
  keys: string[];
  isMuatation?: boolean;
}): {
  url: string;
  keys: QueryKey | MutationKey;
  axiosConfig: AxiosRequestConfig;
  methode: eHttpMethod | undefined;
  hasInvalidation: boolean;
  hasErrorHandling: boolean;
} => {
  let url: string = opts.url;
  let keys: QueryKey = [...opts.keys];
  let hasAuthentication = true;
  let hasInvalidation = true;
  let hasErrorHandling = true;
  let methode: eHttpMethod | undefined = undefined;

  if (opts.isMuatation) {
    methode = eHttpMethod.POST;
    const mutationConfig = opts.config as IMutationOpts<TData>;
    if (mutationConfig?.queryConfig?.hasInvalidation === false) {
      hasInvalidation = false;
    }
    if (mutationConfig?.queryConfig?.hasErrorHandling === false) {
      hasErrorHandling = false;
    }
  }
  if (opts.config?.queryConfig?.queryUrl) {
    url = `${opts.url}/${opts.config.queryConfig.queryUrl}`;
    keys = [...keys, opts.config.queryConfig.queryUrl];
  }
  if (opts.config?.queryConfig?.queryParam) {
    url = `${opts.url}/${opts.config.queryConfig.queryParam}`;
    keys = [...keys, opts.config.queryConfig.queryParam];
    if (opts.isMuatation) {
      methode = eHttpMethod.PATCH;
    }
  }
  if (opts.config?.queryConfig?.queryString) {
    url = `${opts.url}?${opts.config.queryConfig.queryString}`;
    keys = [...keys, opts.config.queryConfig.queryString];
  }
  if (opts.config?.queryConfig?.queryKey) {
    keys = [...keys, opts.config?.queryConfig?.queryKey];
  }

  if (opts.isMuatation && opts?.config?.httpConfig?.methode) {
    methode = opts?.config?.httpConfig?.methode;
  }
  if (opts.config?.httpConfig?.axiosConfig?.hasAuth) {
    hasAuthentication = opts.config?.httpConfig?.axiosConfig?.hasAuth;
  }
  let axiosConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${'token'}`,
      ...opts.config?.httpConfig?.axiosConfig?.headers,
    },
    ...opts.config?.httpConfig?.axiosConfig,
  };
  if (!hasAuthentication) {
    axiosConfig = {
      ...opts.config?.httpConfig?.axiosConfig,
    };
  }

  return {
    url,
    keys,
    axiosConfig,
    methode,
    hasInvalidation,
    hasErrorHandling,
  };
};

export const passwordHash = {
  hashIt: async function (password: string) {
    const salt = await bcrypt.genSalt(8);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  },
  compareIt: function (candidatePassword: string, password: string) {
    const validPassword = bcrypt.compareSync(candidatePassword, password);
    return validPassword;
  },
};

/**
 *
 * @param error
 * @param status
 * @returns
 */
export const sendError = (error: string, status: eStatusCode) => {
  return NextResponse.json(
    {
      message: error,
      status,
    },
    {
      status,
    },
  );
};

/**
 *
 * @param user
 * @returns
 */
export const signJWTToken = (user: UserDTO) => {
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, (process.env as any).JWT_SECRET_KEY, {
    expiresIn: (process.env as any).JWT_EXPIRES_IN,
  });

  return token;
};

/**
 *
 * @param token
 */
export const decodeJwt = async (token: string) => {
  const tokenObj: { decoded?: DecodedTokenDTO; error?: string } = {};
  jwt.verify(token, (process.env as any).JWT_SECRET_KEY, function (err: any, decoded: any) {
    if (!err) {
      tokenObj.decoded = decoded;
      tokenObj.error = undefined;
    } else {
      const message = err?.response?.data?.message || err.message || err.toString();
      tokenObj.error = message;
      tokenObj.decoded = undefined;
    }
  });
  return tokenObj;
};

/**
 *
 * @param restrictedroles
 * @param userRole
 * @returns
 */
export const restrictTo = (restrictedroles: user_role[], userRole: user_role) => {
  if (!restrictedroles.includes(userRole)) {
    return true;
  }
  return false;
};
