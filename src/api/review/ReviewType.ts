export type Review = {
  review_id: string;
  user_id: string;
  restaurant_id: string;
  username: string;
  restaurantName: string;
  title: string;
  content: string;
  rating: number;
  spending: number;
  visit_date: string;
  photo?: string;
  active: boolean;
  created_at: string;
  modified_at: string;
};

export type CreateReviewDto = {
  user_id: string;
  restaurant_id: string;
  title: string;
  content: string;
  rating: number;
  spending: number;
  visit_date: Date;
};
