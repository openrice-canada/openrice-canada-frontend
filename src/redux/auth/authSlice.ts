import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../../api/auth/authType";
import { postUserAuth, postUserRegister } from "../../api/auth/authApiIndex";

export interface IAuthState {
  users: UserLogin[];
  currentUser: UserLogin | null;
  message: string;
}

const initialState: IAuthState = {
  users: [],
  currentUser: null,
  message: "",
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

<<<<<<< Updated upstream
const toDoItemReducer = createSlice({
=======
export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async () => {
    const response = await getCurrentUserCheck();
    return response;
  }
);

const authSlice = createSlice({
>>>>>>> Stashed changes
  name: "auth",
  initialState,
  reducers: {
    // getAllToDoItems: (
    //   state: IAuthState,
    //   action: PayloadAction<UserLogin[]>
    // ) => {
    //   state.users = action.payload;
    // },
    // addToDoItem: (state: IAuthState, action: PayloadAction<UserLogin>) => {
    //   state.users.unshift(action.payload);
    // },
    // updateToDoItem: (
    //   state: IAuthState,
    //   action: PayloadAction<{ id: string; name: string }>
    // ) => {
    //   const { id, name } = action.payload;
    //   state.users.filter((item) => item.user_id === id)[0].username = name;
    // },
    // deleteToDoItem: (state: IAuthState, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   state.users.splice(
    //     state.users.findIndex((item) => item.user_id === id),
    //     1
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
      }
      sessionStorage.setItem("jwt", action.payload.token || "");
      if (action.payload.message) {
        state.message = action.payload.message;
      }
    });
  },
});

// export const { getAllToDoItems, addToDoItem, updateToDoItem, deleteToDoItem } =
//   authSlice.actions;
export default authSlice.reducer;
