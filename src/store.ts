import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "./redux/auth/authSlice";
import restaurantReducer, {
  IRestaurantState,
} from "./redux/restaurant/restaurantSlice";
import reviewsReducer, { IReviewsState } from "./redux/reviews/reviewsSlice";
import dishReducer, { IDishState } from "./redux/dish/dishSlice";
import districtReducer, {
  IDistrictState,
} from "./redux/district/districtSlice";
import paymentMethodReducer, {
  IPaymentMethodState,
} from "./redux/paymentMethod/paymentMethodSlice";
import restaurantDishReducer, {
  IRestaurantDishState,
} from "./redux/restaurantDish/restaurantDishSlice";
import restaurantPaymentMethodReducer, {
  IRestaurantPaymentMethodState,
} from "./redux/restaurantPaymentMethod/restaurantPaymentMethodSlice";

export interface IRootState {
  auth: IAuthState;
  restaurant: IRestaurantState;
  review: IReviewsState;
  dish: IDishState;
  district: IDistrictState;
  paymentMethod: IPaymentMethodState;
  restaurantDish: IRestaurantDishState;
  restaurantPaymentMethod: IRestaurantPaymentMethodState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
  restaurant: restaurantReducer,
  review: reviewsReducer,
  dish: dishReducer,
  district: districtReducer,
  paymentMethod: paymentMethodReducer,
  restaurantDish: restaurantDishReducer,
  restaurantPaymentMethod: restaurantPaymentMethodReducer,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
