import { AxiosApiClientBuilder } from "../axiosIndex";
import { CreateReviewDto, Review } from "./ReviewType";

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
  createReviewDto: CreateReviewDto,
  restaurantID: string,
  photoCategory: string,
  fileExtension?: string
): Promise<Review> => {
  return apiClient.post(
    "",
    { createReviewDto, restaurantID, fileExtension },
    { params: { photoCategory } }
  );
};

export const getReview = async (reviewID: string): Promise<Review> => {
  return apiClient.get(`id/${reviewID}`);
};
