import { AxiosApiClientBuilder } from "../axiosApiIndex";
import { CreateReviewRequest, Review } from "./ReviewType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/review")
  .build();

export const getReviewList = async (): Promise<Review[]> => {
  return apiClient.get("");
};

<<<<<<< Updated upstream
export const getReviewListByRestaurantId = async (
=======
export const getReviewsByRestaurantID = async (
>>>>>>> Stashed changes
  restaurantId: string
): Promise<Review[]> => {
  return apiClient.get("", { params: { restaurantId } });
};

export const postReview = async (
  input: CreateReviewRequest
): Promise<Review> => {
  return apiClient.post("", input);
};

export const getReviewByReviewId = async (
  reviewId: string
): Promise<Review> => {
  return apiClient.get(reviewId);
};
