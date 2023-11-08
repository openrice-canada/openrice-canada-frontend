export type Review = {
  reviewId: string;
  userId: string;
  restaurantId: string;
  rating: number;
  title: string;
  visitDate: string;
  content: string;
  spending: number;
  createdAt: string;
  modifiedAt: string;
  active: boolean;
  username: string;
  restaurantName: string;
};

export type CreateReviewRequest = {
  userId: string;
  restaurantId: string;
  rating: number;
  title: string;
  visitDate: Date;
  content: string;
  spending: number;
}