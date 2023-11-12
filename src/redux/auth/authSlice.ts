import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../../api/auth/authType";
import {
  getCurrentUserCheck,
  postUserAuth,
  postUserRegister,
} from "../../api/auth/authApiIndex";

export interface IAuthState {
  users: UserLogin[];
  currentUser: UserLogin | null;
  message: string;
  registerSuccess: boolean | null;
  loginSuccess: boolean | null;
}

const initialState: IAuthState = {
  users: [],
  currentUser: null,
  message: "",
  registerSuccess: null,
  loginSuccess: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: { email: string; username: string; password: string }) => {
    const response = await postUserRegister(user);
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: { username: string; password: string }) => {
    const response = await postUserAuth(user);
    return response;
  }
);

export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async () => {
    const response = await getCurrentUserCheck();
    return response;
  }
);

const toDoItemReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAllToDoItems: (
      state: IAuthState,
      action: PayloadAction<UserLogin[]>
    ) => {
      state.users = action.payload;
    },

    addToDoItem: (state: IAuthState, action: PayloadAction<UserLogin>) => {
      state.users.unshift(action.payload);
    },

    updateToDoItem: (
      state: IAuthState,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      state.users.filter((item) => item.user_id === id)[0].username = name;
    },

    deleteToDoItem: (state: IAuthState, action: PayloadAction<string>) => {
      const id = action.payload;
      state.users.splice(
        state.users.findIndex((item) => item.user_id === id),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload?.token) {
        sessionStorage.setItem("jwt", action.payload?.token);
        state.registerSuccess = true;
      }
      if (action.payload?.message) {
        state.message = action.payload.message;
        state.registerSuccess = false;
      }
    });

    builder.addCase(login.fulfilled, (state, action) => {
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

    builder.addCase(checkCurrentUser.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
      }
    });
  },
});

export const { getAllToDoItems, addToDoItem, updateToDoItem, deleteToDoItem } =
  toDoItemReducer.actions;
export default toDoItemReducer.reducer;
