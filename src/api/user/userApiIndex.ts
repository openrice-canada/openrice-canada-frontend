import { AxiosApiClientBuilder } from "../axiosIndex";
import { UpdateUserDto, UpdateUserInfoExtended, User } from "./UserType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/user")
  .withCredentials(true)
  .build();

export const getUserList = async (): Promise<User[]> => {
  return apiClient.get("");
};

export const updateUserProfile = async (
  userID: string,
  updateUserDto: UpdateUserDto,
  fileExtension?: string
): Promise<UpdateUserInfoExtended> => {
  return apiClient.put(`/profile/${userID}`, { updateUserDto, fileExtension });
};
