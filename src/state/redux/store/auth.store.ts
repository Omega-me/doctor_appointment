'use client';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { AuthReducer } from '../reducers/auth.reducer';
import { IStateThunk } from '@/common/interfaces';

const initialState: IStateThunk = {
  data: typeof window !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') as string) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  finishProcess: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state: any) => {
      new AuthReducer({ state }).resetAuthState();
    },
    resetFinishProcessState: (state: any) => {
      new AuthReducer({ state }).resetFinishProcess();
    },
    resetAuthMessageState: (state: any) => {
      new AuthReducer({ state }).resetMessage();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    new AuthReducer({ builder }).buildExtraReducers();
  },
});

export const { resetAuthState, resetAuthMessageState, resetFinishProcessState } = authSlice.actions;
export default authSlice.reducer;
