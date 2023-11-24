/* eslint-disable @typescript-eslint/no-empty-interface */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRestaurantOwner } from "../../api/restaurantOwner/restaurantOwnerApiIndex";
import { RestaurantOwner } from "../../api/restaurantOwner/RestaurantOwnerType";

export interface IRestaurantOwnerState {}

const initialState: IRestaurantOwnerState = {};

export const createRestaurantOwnerThunk = createAsyncThunk(
  "restaurantOwner/create",
  async (restaurantOwner: RestaurantOwner) => {
    const response = await createRestaurantOwner(restaurantOwner);
    return response;
  }
);

const restaurantOwnerSlice = createSlice({
  name: "restaurant_owner",
  initialState,
  reducers: {},
});

export default restaurantOwnerSlice.reducer;
