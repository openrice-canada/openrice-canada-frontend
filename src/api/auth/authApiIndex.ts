import { AxiosApiClientBuilder } from "../axiosIndex";
import { AuthType, AuthenticateResponse } from "./authType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/auth/user")
  .withCredentials(true)
  .build();

export const register = async (
  user: AuthType
): Promise<AuthenticateResponse> => {
  return apiClient.post("/register", user);
};

export const login = async (user: AuthType): Promise<AuthenticateResponse> => {
  return apiClient.post("/login", user);
};

export const getCurrentUser = async (): Promise<AuthenticateResponse> => {
  return apiClient.get("/current-user");
};
