import { AxiosApiClientBuilder } from "../axiosIndex";
import {
  Restaurant,
  CreateRestaurantDto,
  SearchRestaurantQuery,
} from "./RestaurantType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/restaurant")
  .build();

export const getRestaurants = async (
  input: SearchRestaurantQuery
): Promise<Restaurant[]> => {
  return apiClient.get("", { params: input });
};

export const getRestaurantsByDish = async (
  dish: string | null
): Promise<Restaurant[]> => {
  return apiClient.get("dish", { params: { dish } });
};

export const getRestaurantDetail = async (
  restaurantId: string
): Promise<Restaurant> => {
  return apiClient.get(`id/${restaurantId}`);
};

export const createRestaurant = async (
  createRestaurantDto: CreateRestaurantDto,
  fileExtension?: string
): Promise<Restaurant> => {
  return apiClient.post("", { createRestaurantDto, fileExtension });
};
