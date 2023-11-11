export type SearchRestaurantQuery = {
  name?: string;
  limit?: number;
  offset?: number;
};

export type Restaurant = {
  address: string;
  latitude: string;
  longitude: string;
  created_at?: string;
  district_id: string;
  intro: string;
  modified_at?: string;
  name: string;
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
  phone: string;
  postal_code: string;
  restaurant_id?: string;
  rating?: number;
  coverImageUrl?: string;
};

export type RestaurantDish = {
  restaurant_id: string;
  dish_id: string;
};

export type RestaurantPaymentMethod = {
  restaurant_id: string;
  payment_method_id: string;
};
