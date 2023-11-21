import { AxiosApiClientBuilder } from "../axiosIndex";
import { RestaurantDish } from "./RestaurantDishType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/restaurant-dish")
  .build();

export const createRestaurantDish = async (
  restaurantDish: RestaurantDish
): Promise<RestaurantDish> => {
  return apiClient.post("/restaurant-dish", restaurantDish);
};
