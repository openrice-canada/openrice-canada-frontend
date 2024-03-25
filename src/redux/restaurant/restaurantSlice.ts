import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateRestaurantDto,
  Restaurant,
} from "../../api/restaurant/RestaurantType";
import {
  getRestaurants,
  getRestaurantsByDish,
  getRestaurantDetail,
  createRestaurant,
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

export const getRestaurantsByDishThunk = createAsyncThunk(
  "restaurant/dish",
  async (dish: string | null) => {
    const response = await getRestaurantsByDish(dish);
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
  async (restaurant: CreateRestaurantDto) => {
    const response = await createRestaurant(restaurant);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetRestaurant: (state) => {
      state.restaurant = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsByQueryThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurants = action.payload;
      }
    });

    builder.addCase(getRestaurantsByDishThunk.fulfilled, (state, action) => {
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

export const { resetRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
