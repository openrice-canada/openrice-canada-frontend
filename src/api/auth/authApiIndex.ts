import { AxiosApiClientBuilder } from "../axiosIndex";
import { Auth, AuthenticateResponse, CreateUserDto } from "./authType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/auth/user")
  .withCredentials(true)
  .build();

export const register = async (
  createUserDto: CreateUserDto,
  fileExtension?: string
): Promise<AuthenticateResponse> => {
  return apiClient.post("/register", { createUserDto, fileExtension });
};

export const login = async (user: Auth): Promise<AuthenticateResponse> => {
  return apiClient.post("/login", user);
};

export const getCurrentUser = async (): Promise<AuthenticateResponse> => {
  return apiClient.get("/current-user");
};
