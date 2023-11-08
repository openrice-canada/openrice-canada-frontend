import { AxiosApiClientBuilder } from "..";
import { District } from "./districtType";

const apiClient = new AxiosApiClientBuilder().withResourceName("/district").build();

export const getDistrictList = async (): Promise<District[]> => {
  return apiClient.get("");
};
