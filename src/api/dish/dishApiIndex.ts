import { AxiosApiClientBuilder } from "../axiosApiIndex";
import { Dish } from "./dishType";

const apiClient = new AxiosApiClientBuilder().withResourceName("/dish").build();

export const getDishList = async (): Promise<Dish[]> => {
  return apiClient.get("");
};
