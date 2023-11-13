import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "./redux/auth/authSlice";
import restaurantReducer, {
  IRestaurantState,
} from "./redux/restaurant/restaurantSlice";
import reviewsReducer, { IReviewsState } from "./redux/reviews/reviewsSlice";

export interface IRootState {
  auth: IAuthState;
  restaurant: IRestaurantState;
  review: IReviewsState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
  restaurant: restaurantReducer,
  review: reviewsReducer,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
