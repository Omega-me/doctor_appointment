import { user, customer_info, doctor_info, user_role } from '@prisma/client';

export interface UserStateDTO extends Omit<user, 'id' | 'password'> {
  noProfile?: boolean;
}

export interface UserDTO extends user {}
export interface CreateUserDTO extends Omit<UserDTO, 'id' | 'role'> {
  passwordConfirm: string;
  remember: boolean;
}
export interface LoginUserDTO extends Omit<CreateUserDTO, 'passwordConfirm'> {}

export interface CustomerUserStateDTO extends customer_info {
  user: UserStateDTO;
}
export interface CustomerInfoDTO extends customer_info {
  user: Omit<UserStateDTO, 'noProfile'>;
}
export interface CreateCustomerInfoDTO extends Omit<CustomerInfoDTO, 'id' | 'user'> {}
export interface UpdateCustomerInfoDTO extends Partial<Omit<CreateCustomerInfoDTO, 'user_id'>> {}

export interface DoctorUserStateDTO extends doctor_info {
  user: UserStateDTO;
}
export interface DoctorInfoDTO extends doctor_info {
  user: Omit<UserStateDTO, 'noProfile'>;
}
export interface CreateDoctorInfoDTO extends Omit<DoctorDTO, 'id' | 'user'> {}
export interface UpdateDoctorInfoDTO extends Partial<Omit<CreateDoctorInfoDTO, 'user_id'>> {}
