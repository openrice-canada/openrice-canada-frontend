/* eslint-disable @typescript-eslint/no-empty-interface */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRestaurantPaymentMethod } from "../../api/restaurantPaymentMethod/restaurantPaymentMethodApiIndex";
import { RestaurantPaymentMethod } from "../../api/restaurantPaymentMethod/RestaurantPaymentMethodType";

export interface IRestaurantPaymentMethodState {}

const initialState: IRestaurantPaymentMethodState = {};

export const createRestaurantPaymentMethodThunk = createAsyncThunk(
  "restaurantPaymentMethod/create",
  async (restaurantPaymentMethod: RestaurantPaymentMethod) => {
    const response = await createRestaurantPaymentMethod(
      restaurantPaymentMethod
    );
    return response;
  }
);

const restaurantPaymentMethodSlice = createSlice({
  name: "restaurant_payment_method",
  initialState,
  reducers: {},
});

export default restaurantPaymentMethodSlice.reducer;
