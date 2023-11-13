import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Restaurant } from "../../api/restaurant/RestaurantType";
import {
  getRestaurantDetail,
  getRestaurants,
} from "../../api/restaurant/restaurantApiIndex";

export interface IRestaurantState {
  restaurant: Restaurant | null;
  restaurants: Restaurant[];
}

const initialState: IRestaurantState = {
  restaurant: null,
  restaurants: [],
};

export const getRestaurant = createAsyncThunk(
  "restaurant/detail",
  async (id: string) => {
    const response = await getRestaurantDetail(id);
    return response;
  }
);

export const getRestaurantsByQuery = createAsyncThunk(
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

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurant.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurant = action.payload;
      }
    });

    builder.addCase(getRestaurantsByQuery.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurants = action.payload;
      }
    });
  },
});

export default restaurantSlice.reducer;
