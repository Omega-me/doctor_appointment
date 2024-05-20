import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { login, signup } from '../actions/auth.action';
import { IStateThunk } from '@/common/interfaces';

export class AuthReducer {
  private _builder?: ActionReducerMapBuilder<any>;
  private _state?: IStateThunk;

  constructor(options: { builder?: ActionReducerMapBuilder<IStateThunk>; state?: IStateThunk; payload?: any }) {
    this._builder = options && options.builder;
    this._state = options && options.state;
  }

  resetAuthState() {
    if (this._state) {
      this._state.isLoading = false;
      this._state.isError = false;
      this._state.isSuccess = false;
      this._state.finishProcess = false;
      this._state.message = '';
      this._state.data = null;
    }
  }

  resetFinishProcess() {
    if (this._state) {
      this._state.finishProcess = false;
    }
  }

  resetMessage() {
    if (this._state) {
      this._state.message = '';
    }
  }

  buildExtraReducers() {
    if (this._builder) {
      this._builder
        .addCase(signup.pending, (state: IStateThunk) => {
          state.isLoading = true;
        })
        .addCase(signup.fulfilled, (state: IStateThunk, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.finishProcess = true;
          state.data = payload as any;
        })
        .addCase(signup.rejected, (state: IStateThunk, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.finishProcess = true;
          state.message = payload as string;
        });

      this._builder
        .addCase(login.pending, (state: IStateThunk) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state: IStateThunk, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.finishProcess = true;
          state.data = payload as any;
        })
        .addCase(login.rejected, (state: IStateThunk, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.finishProcess = true;
          state.message = payload as string;
        });
    }
  }
}
