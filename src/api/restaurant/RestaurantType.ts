export type SearchRestaurantQuery = {
  name?: string;
  limit?: number;
  offset?: number;
}

export type Restaurant = {
  address: string;
  latitude: string;
  longitude: string;
  createdAt?: string;
  districtId: string;
  intro: string;
  modifiedAt?: string;
  name: string;
  openingHours: {
    monday: { from: string; to: string };
    tuesday: { from: string; to: string };
    wednesday: { from: string; to: string };
    thursday: { from: string; to: string };
    friday: { from: string; to: string };
    saturday: { from: string; to: string };
    sunday: { from: string; to: string };
    holiday?: { from: string; to: string };
  } | string;
  phone: string;
  postalCode: string;
  restaurantId?: string;
  rating?: number;
  coverImageUrl?: string;
};

export type RestaurantDish = {
  restaurantId: string;
  dishId: string;
};

export type RestaurantPaymentMethod = {
  restaurantId: string;
  paymentMethodId: string;
};
