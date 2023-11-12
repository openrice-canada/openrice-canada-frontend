import { AxiosApiClientBuilder } from "../axiosIndex";
import { Dish } from "./dishType";

const apiClient = new AxiosApiClientBuilder().withResourceName("/dish").build();

export const getDishes = async (): Promise<Dish[]> => {
  return apiClient.get("");
};
