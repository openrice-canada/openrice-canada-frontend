import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login, register } from "../../api/auth/authApiIndex";
import { CurrentLoginUserInfo } from "../../api/auth/authType";
import { updateUserProfile } from "../../api/user/userApiIndex";
import { UpdateUserDto } from "../../api/user/UserType";

export interface IAuthState {
  currentUser: CurrentLoginUserInfo | null;
  message: string;
  registerSuccess: boolean | null;
  loginSuccess: boolean | null;
  updateProfileSuccess: boolean | null;
}

const initialState: IAuthState = {
  currentUser: null,
  message: "",
  registerSuccess: null,
  loginSuccess: null,
  updateProfileSuccess: null,
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

export const updateUserProfileThunk = createAsyncThunk(
  "auth/updateUserProfile",
  async ({
    userID,
    profile,
    fileExtension,
  }: {
    userID: string;
    profile: UpdateUserDto;
    fileExtension: string;
  }) => {
    const response = await updateUserProfile(userID, profile, fileExtension);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRegisterStatus: (
      state: IAuthState,
      action: PayloadAction<boolean>
    ) => {
      state.registerSuccess = action.payload;
    },
    updateMessage: (state: IAuthState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    updateCurrentUserProfilePicture: (
      state: IAuthState,
      action: PayloadAction<CurrentLoginUserInfo>
    ) => {
      state.currentUser = action.payload;
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

    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
        state.updateProfileSuccess = false;
      } else if (action.payload.userInfo && action.payload.token) {
        state.currentUser = action.payload.userInfo;
        sessionStorage.setItem("jwt", action.payload.token);
        state.updateProfileSuccess = true;
      }
    });
  },
});

export const {
  updateRegisterStatus,
  updateMessage,
  updateCurrentUserProfilePicture,
} = authSlice.actions;
export default authSlice.reducer;
