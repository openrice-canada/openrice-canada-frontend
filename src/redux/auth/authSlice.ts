import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login, register } from "../../api/auth/authApiIndex";

export interface CurrentLoginUserInfo {
  user_id: string;
  username: string;
  email: string;
  role: string;
}

export interface IAuthState {
  currentUser: CurrentLoginUserInfo | null;
  message: string;
  registerSuccess: boolean | null;
  loginSuccess: boolean | null;
}

const initialState: IAuthState = {
  currentUser: null,
  message: "",
  registerSuccess: null,
  loginSuccess: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (user: { email: string; username: string; password: string }) => {
    const response = await register(user);
    return response;
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (user: { username: string; password: string }) => {
    const response = await login(user);
    return response;
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const response = await getCurrentUser();
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateMessage: (state: IAuthState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if (action.payload?.token) {
        sessionStorage.setItem("jwt", action.payload?.token);
        state.registerSuccess = true;
      }
      if (action.payload?.message) {
        state.message = action.payload.message;
        state.registerSuccess = false;
      }
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.currentUser = action.payload.user;
        state.loginSuccess = true;
      }
      sessionStorage.setItem("jwt", action.payload?.token || "");
      if (action.payload?.message) {
        state.message = action.payload.message;
        state.loginSuccess = false;
      }
    });

    builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
      }
    });
  },
});

export const { updateMessage } = authSlice.actions;
export default authSlice.reducer;
