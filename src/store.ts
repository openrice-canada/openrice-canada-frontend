import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "./redux/auth/authSlice";

export interface IRootState {
  auth: IAuthState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
