import { AxiosApiClientBuilder } from "../axiosIndex";
import { District } from "./districtType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/district")
  .build();

export const getDistricts = async (): Promise<District[]> => {
  return apiClient.get("");
};
