import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "./redux/auth/authSlice";
import restaurantReducer, {
  IRestaurantState,
} from "./redux/restaurant/restaurantSlice";
import reviewReducer, { IReviewState } from "./redux/review/reviewSlice";
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
import photoReducer, { IPhotoState } from "./redux/photo/photoSlice";

export interface IRootState {
  auth: IAuthState;
  restaurant: IRestaurantState;
  review: IReviewState;
  dish: IDishState;
  district: IDistrictState;
  paymentMethod: IPaymentMethodState;
  restaurantDish: IRestaurantDishState;
  restaurantPaymentMethod: IRestaurantPaymentMethodState;
  photo: IPhotoState;
}

const reducer = combineReducers<IRootState>({
  auth: authReducer,
  restaurant: restaurantReducer,
  review: reviewReducer,
  dish: dishReducer,
  district: districtReducer,
  paymentMethod: paymentMethodReducer,
  restaurantDish: restaurantDishReducer,
  restaurantPaymentMethod: restaurantPaymentMethodReducer,
  photo: photoReducer,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
