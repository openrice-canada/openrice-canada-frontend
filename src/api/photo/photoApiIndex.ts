import { AxiosApiClientBuilder } from "../axiosIndex";
import { MenuPhoto, ReviewPhoto } from "./PhotoType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/photo")
  .build();

export const getReviewPhotos = async (
  restaurantID: string
): Promise<ReviewPhoto[]> => {
  return apiClient.get("review", { params: { restaurantID } });
};

export const getMenuPhotos = async (
  restaurantID: string
): Promise<MenuPhoto[]> => {
  return apiClient.get("menu", { params: { restaurantID } });
};

export const createMenuPhoto = async (
  imagePrefix: string,
  restaurantID: string,
  imageName: string,
  photoCategory: string
): Promise<MenuPhoto> => {
  return apiClient.post(
    "",
    { imagePrefix, restaurantID, imageName },
    { params: { photoCategory } }
  );
};
