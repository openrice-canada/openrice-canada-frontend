import { AxiosApiClientBuilder } from "../axiosIndex";
import { Photo } from "./PhotoType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/photo")
  .build();

export const getReviewPhotos = async (
  restaurantID: string
): Promise<Photo[]> => {
  return apiClient.get("review", { params: { restaurantID } });
};

export const getMenuPhotos = async (restaurantID: string): Promise<Photo[]> => {
  return apiClient.get("menu", { params: { restaurantID } });
};
