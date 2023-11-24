import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateReviewDto, Review } from "../../api/review/ReviewType";
import {
  getReview,
  getReviewsByRestaurantID,
  createReview,
} from "../../api/review/reviewApiIndex";

export interface IReviewState {
  reviews: Review[];
  review: Review | null;
}

const initialState: IReviewState = {
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
  async ({
    review,
    restaurantID,
    photoCategory,
  }: {
    review: CreateReviewDto;
    restaurantID: string;
    photoCategory: string;
  }) => {
    const response = await createReview(review, restaurantID, photoCategory);
    return response;
  }
);

const reviewReducer = createSlice({
  name: "review",
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

export default reviewReducer.reducer;
