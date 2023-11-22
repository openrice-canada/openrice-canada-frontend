export interface Restaurant {
  restaurant_id: string;
  name: string;
  address: string;
  district_id: string;
  latitude: string;
  longitude: string;
  postal_code: string;
  phone: string;
  intro: string;
  opening_hours: string;
  cover_image_url?: string;
  averageRating: number;
  reviewCount: number;
  active: boolean;
  created_at: Date;
  modified_at: Date;
}

export type SearchRestaurantQuery = {
  name?: string;
  limit?: number;
  offset?: number;
};

export type CreateRestaurantType = {
  name: string;
  address: string;
  district_id: string;
  latitude: string;
  longitude: string;
  postal_code: string;
  phone: string;
  intro: string;
  opening_hours:
    | {
        monday: { from: string; to: string };
        tuesday: { from: string; to: string };
        wednesday: { from: string; to: string };
        thursday: { from: string; to: string };
        friday: { from: string; to: string };
        saturday: { from: string; to: string };
        sunday: { from: string; to: string };
        holiday?: { from: string; to: string };
      }
    | string;
  cover_image_url?: string;
  rating?: number;
  created_at?: string;
  modified_at?: string;
};
