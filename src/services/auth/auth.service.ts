import { jwtDecode } from 'jwt-decode';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
import { CreateUserDTO, LoginUserDTO } from '@/common/dto';
import { httpClient } from '../axios/axios.service';
import { user_role } from '@prisma/client';

/**
 *
 * @param userData
 * @returns
 */
export const signupService = async (userData: CreateUserDTO): Promise<IResponse<any> | undefined> => {
  const data: IResponse<any> | undefined = await httpClient(eHttpMethod.POST, eApiRoutes.AUTH_SIGNUP, {
    data: userData,
  });
  return data;
};

/**
 *
 * @param loginData
 * @returns
 */
export const siginService = async (loginData: LoginUserDTO): Promise<IResponse<any> | undefined> => {
  const data: IResponse<any> | undefined = await httpClient(eHttpMethod.POST, eApiRoutes.AUTH_LOGIN, {
    data: loginData,
  });

  return data;
};

/**
 * logout service
 */
export const logoutService = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 *
 * @param token
 */
export const setUserDataService = async <TData = any>(token: string, remember: boolean) => {
  const decoded: { email: string; exp: number; iat: number; id: string; role: user_role } = jwtDecode(token);
  if (decoded && decoded.role !== user_role.Admin) {
    const res: IResponse<TData> | undefined = await httpClient(eHttpMethod.GET, eApiRoutes.AUTH_ME, {
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    if (res && res.data) {
      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      const userData = {
        ...res.data,
        user: {
          ...(res.data as any).user,
          token,
        },
      };
      return userData;
    } else {
      const userData = {
        user: {
          email: decoded.email,
          role: decoded.role,
          noProfile: true,
          token,
        },
      };
      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return userData;
    }
  }
  const userData = {
    user: {
      email: decoded.email,
      role: user_role.Admin,
      token,
    },
  };
  if (remember) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  return userData;
};
