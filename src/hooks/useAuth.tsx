import { CreateUserDTO, LoginUserDTO } from '@/common/dto';
import { eRoutes } from '@/common/enums/eRoutes';
import { logoutService } from '@/services';
import { signup as signupAction, login as loginAction } from '@/state/redux/actions/auth.action';
import { useAppDispatch, useAppSelector } from '@/state/redux/store';
import {
  resetAuthState as resetAction,
  resetFinishProcessState as resetFinishProcess,
  resetAuthMessageState as resetAuthMessage,
} from '@/state/redux/store/auth.store';
import { useRouter } from 'next/navigation';

const useAuth = <TData,>() => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isSuccess, message, finishProcess } = useAppSelector(state => state.authState);

  /**
   *@summary dispatches resetAuthState
   */
  const resetAuthState = (): void => {
    dispatch(resetAction());
  };

  const resetAuthMessageState = (): void => {
    dispatch(resetAuthMessage());
  };

  const resetFinishProcessState = (): void => {
    dispatch(resetFinishProcess());
  };

  /**
   *
   * @param config
   */
  const signup = (signup: CreateUserDTO): void => {
    dispatch(signupAction(signup)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        resetFinishProcessState();
        router.push(eRoutes.PROFILE);
      }
    });
  };

  /**
   *
   * @param config
   */
  const login = (loginDto: LoginUserDTO): void => {
    dispatch(loginAction(loginDto)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        resetFinishProcessState();
        router.push(eRoutes.HOME);
      }
    });
  };

  const logout = (): void => {
    logoutService();
    resetAuthState();
    router.push(eRoutes.LOGIN);
  };

  return {
    data: data as TData,
    isError,
    isLoading,
    isSuccess,
    message,
    finishProcess,
    signup,
    login,
    logout,
    resetAuthState,
    resetFinishProcessState,
  };
};

export default useAuth;
