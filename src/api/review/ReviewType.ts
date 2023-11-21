export type Review = {
  review_id: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  title: string;
  visit_date: string;
  content: string;
  spending: number;
  created_at: string;
  modified_at: string;
  active: boolean;
  username: string;
  restaurantName: string;
};

export type CreateReviewRequest = {
  user_id: string;
  restaurant_id: string;
  title: string;
  content: string;
  rating: number;
  spending: number;
  visit_date: Date;
};
