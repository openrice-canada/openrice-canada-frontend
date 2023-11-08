import { AxiosApiClientBuilder } from "..";
import { Restaurant, RestaurantDish, RestaurantPaymentMethod, SearchRestaurantQuery } from "./RestaurantType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/restaurant")
  .build();

export const getRestaurantList = async (input: SearchRestaurantQuery): Promise<Restaurant[]> => {
  return apiClient.get("", { params: input });
};

export const getRestaurantDetail = async (restaurantId: string): Promise<Restaurant> => {
  return apiClient.get(restaurantId);
};

export const postRestaurant = async (restaurant: Restaurant): Promise<Restaurant> => {
	return apiClient.post('', restaurant);
};

export const postRestaurantDIsh = async (dish: RestaurantDish): Promise<RestaurantDish> => {
	return apiClient.post('/dish', dish);
};

export const postRestaurantPaymentMethod = async (paymentMethod: RestaurantPaymentMethod): Promise<RestaurantPaymentMethod> => {
	return apiClient.post('/payment', paymentMethod);
};
