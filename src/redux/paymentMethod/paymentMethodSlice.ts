import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaymentMethod } from "../../api/payment/paymentMethodType";
import { getPaymentMethods } from "../../api/payment/paymentApiIndex";

export interface IPaymentMethodState {
  paymentMethods: PaymentMethod[];
}

const initialState: IPaymentMethodState = {
  paymentMethods: [],
};

export const getPaymentMethodsThunk = createAsyncThunk(
  "paymentMethod/paymentMethods",
  async () => {
    const response = await getPaymentMethods();
    return response;
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentMethodsThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.paymentMethods = action.payload;
      }
    });
  },
});

export default paymentMethodSlice.reducer;
