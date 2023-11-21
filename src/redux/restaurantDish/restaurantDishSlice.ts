/* eslint-disable @typescript-eslint/no-empty-interface */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRestaurantDish } from "../../api/restaurantDish/restaurantDishApiIndex";
import { RestaurantDish } from "../../api/restaurantDish/RestaurantDishType";

export interface IRestaurantDishState {}

const initialState: IRestaurantDishState = {};

export const createRestaurantDishThunk = createAsyncThunk(
  "restaurantDish/create",
  async (restaurantDish: RestaurantDish) => {
    const response = await createRestaurantDish(restaurantDish);
    return response;
  }
);

const restaurantDishSlice = createSlice({
  name: "restaurant_dish",
  initialState,
  reducers: {},
});

export default restaurantDishSlice.reducer;
