import { AxiosApiClientBuilder } from "../axiosIndex";
import { RestaurantOwner } from "./RestaurantOwnerType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/restaurant/owner")
  .build();

export const createRestaurantOwner = async (
  restaurantOwner: RestaurantOwner
): Promise<RestaurantOwner> => {
  return apiClient.post("", restaurantOwner);
};
