export interface Auth {
  username: string;
  email?: string;
  password: string;
  role?: string;
}

export interface CreateUserDto {
  username: string;
  email?: string;
  password: string;
}

export interface CurrentLoginUserInfo {
  user_id: string;
  username: string;
  email: string;
  role: string;
  profile_picture_url: string;
}

export interface AuthenticateResponse {
  token?: string;
  message?: string;
  user?: CurrentLoginUserInfo;
}
