import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dish } from "../../api/dish/dishType";
import { getDishes } from "../../api/dish/dishApiIndex";

export interface IDishState {
  dishes: Dish[];
  dish: Dish | null;
}

const initialState: IDishState = {
  dishes: [],
  dish: null,
};

export const getDishesThunk = createAsyncThunk("dish/dishes", async () => {
  const response = await getDishes();
  return response;
});

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDishesThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.dishes = action.payload;
      }
    });
  },
});

export default dishSlice.reducer;
