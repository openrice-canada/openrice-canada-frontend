import { CurrentLoginUserInfo } from "../auth/authType";

export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  modified_at: Date;
  restaurant_id?: string;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  role: string;
  password?: string;
}

export interface UpdateUserInfo extends CurrentLoginUserInfo {
  user_id: string;
  username: string;
  email: string;
  role: string;
  profile_picture_url: string;
}

export interface UpdateUserInfoExtended {
  userInfo?: UpdateUserInfo;
  token?: string;
  message?: string;
}
