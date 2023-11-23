export type ReviewPhoto = {
  review_photo_id: string;
  photo_category_id: string;
  review_id: string;
  restaurant_id?: string;
  photo_url: string;
  active: boolean;
  created_at: string;
};

export type MenuPhoto = {
  menu_photo_id: string;
  photo_category_id: string;
  review_id?: string;
  restaurant_id: string;
  photo_url: string;
  active: boolean;
  created_at: string;
};
