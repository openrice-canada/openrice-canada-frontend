import { AxiosApiClientBuilder } from "../axiosIndex";
import { RestaurantPaymentMethod } from "./RestaurantPaymentMethodType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/restaurant-payment")
  .build();

export const createRestaurantPaymentMethod = async (
  restaurantPaymentMethod: RestaurantPaymentMethod
): Promise<RestaurantPaymentMethod> => {
  return apiClient.post("/restaurant-payment", restaurantPaymentMethod);
};
