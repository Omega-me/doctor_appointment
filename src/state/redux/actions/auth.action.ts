import { CreateUserDTO, LoginUserDTO } from '@/common/dto';
import { IResponse } from '@/common/interfaces';
import { setUserDataService, siginService, signupService } from '@/services';
import { user_role } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signup = createAsyncThunk('auth/signup', async (signupDto: CreateUserDTO, thunkAPI) => {
  try {
    const response: IResponse<{ token: string }> | undefined = await signupService(signupDto);
    let userData: any;
    if (response && response.data) {
      userData = await setUserDataService(response.data.token, signupDto.remember);
    }
    if (!userData) {
      return {
        user: {
          email: signupDto.email,
          role: user_role.Patient,
          noProfile: true,
        },
      };
    }
    return userData;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (loginDto: LoginUserDTO, thunkAPI) => {
  try {
    const response: IResponse<{ token: string }> | undefined = await siginService(loginDto);
    let userData: any;
    if (response && response.data) {
      userData = await setUserDataService(response.data.token, loginDto.remember);
    }
    if (!userData) {
      return {
        user: {
          email: loginDto.email,
          role: user_role.Patient,
          noProfile: true,
        },
      };
    }
    return userData;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
