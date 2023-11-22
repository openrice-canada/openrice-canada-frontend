import { AxiosApiClientBuilder } from "../axiosIndex";
import { CreateReviewRequest, Review } from "./ReviewType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/review")
  .build();

export const getReviews = async (): Promise<Review[]> => {
  return apiClient.get("");
};

export const getReviewsByRestaurantID = async (
  restaurantID: string
): Promise<Review[]> => {
  return apiClient.get("", { params: { restaurantID } });
};

export const createReview = async (
  input: CreateReviewRequest
): Promise<Review> => {
  return apiClient.post("", input);
};

export const getReview = async (reviewId: string): Promise<Review> => {
  return apiClient.get(reviewId);
};
