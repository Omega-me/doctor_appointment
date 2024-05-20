import { CustomerInfoDTO, DoctorInfoDTO, UserStateDTO, CustomerUserStateDTO, DoctorUserStateDTO } from '../dto';

export type UserStateType = (CustomerUserStateDTO & DoctorUserStateDTO & { user: UserStateDTO }) | null;

export interface IStateThunk {
  data: UserStateType;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  finishProcess: boolean;
}
