import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateRestaurantType,
  Restaurant,
} from "../../api/restaurant/RestaurantType";
import {
  createRestaurant,
  getRestaurantDetail,
  getRestaurants,
} from "../../api/restaurant/restaurantApiIndex";

export interface IRestaurantState {
  restaurants: Restaurant[];
  restaurant: Restaurant | null;
}

const initialState: IRestaurantState = {
  restaurants: [],
  restaurant: null,
};

export const getRestaurantsByQueryThunk = createAsyncThunk(
  "restaurant/restaurants",
  async (query?: { name?: string; limit?: number; offset?: number }) => {
    if (query) {
      const response = await getRestaurants(query);
      return response;
    }

    const response = await getRestaurants({});
    return response;
  }
);

export const getRestaurantThunk = createAsyncThunk(
  "restaurant/detail",
  async (id: string) => {
    const response = await getRestaurantDetail(id);
    return response;
  }
);

export const createRestaurantThunk = createAsyncThunk(
  "restaurant/create",
  async (restaurant: CreateRestaurantType) => {
    const response = await createRestaurant(restaurant);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsByQueryThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurants = action.payload;
      }
    });

    builder.addCase(getRestaurantThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurant = action.payload;
      }
    });
  },
});

export default restaurantSlice.reducer;
