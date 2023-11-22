export type Photo = {
  photo_id: string;
  photo_category_id: string;
  review_id: string;
  restaurant_id?: string;
  photo_url: string;
  active: boolean;
  created_at: string;
};
