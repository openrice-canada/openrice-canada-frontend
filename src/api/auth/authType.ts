import { CurrentLoginUserInfo } from "../../redux/auth/authSlice";

export type Auth = {
  username?: string;
  email?: string;
  password: string;
  role?: string;
};

export type AuthenticateResponse = {
  token?: string;
  message?: string;
  user?: CurrentLoginUserInfo;
};
