export type User = {
  email?: string;
  username?: string;
  password: string;
  role?: string;
};

export type UserEntity = {
  user_id: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  modifiedAt: string;
  active: boolean;
  role: string;
  enabled: boolean;
  authorities: [
    {
      authority: string;
    }
  ];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type AuthenticateResponse = {
  token?: string;
  message?: string;
  userEntity?: UserEntity;
};
