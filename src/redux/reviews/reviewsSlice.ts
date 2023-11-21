import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateReviewRequest, Review } from "../../api/review/ReviewType";
import {
  getReview,
  getReviewsByRestaurantID,
  createReview,
} from "../../api/review/reviewApiIndex";

export interface IReviewsState {
  reviews: Review[];
  review: Review | null;
}

const initialState: IReviewsState = {
  reviews: [],
  review: null,
};

export const getReviewsThunk = createAsyncThunk(
  "review/restaurantStatus",
  async (id: string) => {
    const response = await getReviewsByRestaurantID(id);
    return response;
  }
);

export const getReviewThunk = createAsyncThunk(
  "review/IDStatus",
  async (id: string) => {
    const response = await getReview(id);
    return response;
  }
);

export const createReviewThunk = createAsyncThunk(
  "review/create",
  async (review: CreateReviewRequest) => {
    const response = await createReview(review);
    return response;
  }
);

const reviewsReducer = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewsThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.reviews = action.payload;
      }
    });

    builder.addCase(getReviewThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.review = action.payload;
      }
    });

    builder.addCase(createReviewThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.review = action.payload;
      }
    });
  },
});

export default reviewsReducer.reducer;
