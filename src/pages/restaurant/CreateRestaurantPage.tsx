/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import DatePicker from "react-datepicker";

import { createRestaurant } from "../../api/restaurant/restaurantApiIndex";
import { getCurrentUser } from "../../api/auth/authApiIndex";
import { AppDispatch, IRootState } from "../../store";
import { getDishesThunk } from "../../redux/dish/dishSlice";
import { getDistrictsThunk } from "../../redux/district/districtSlice";
import { getPaymentMethodsThunk } from "../../redux/paymentMethod/paymentMethodSlice";
import { createRestaurantPaymentMethodThunk } from "../../redux/restaurantPaymentMethod/restaurantPaymentMethodSlice";
import { createRestaurantOwnerThunk } from "../../redux/restaurantOwner/restaurantOwnerSlice";
import { createRestaurantDishThunk } from "../../redux/restaurantDish/restaurantDishSlice";
import { fileTypeToExtension } from "../../utils/fileTypeToExtension";
import { uploadRestaurantCoverImage } from "../../utils/uploadImageService";
import TextareaInput from "../../components/utils/inputs/TextareaInput";
import TextInput from "../../components/utils/inputs/TextInput";
import SelectInput from "../../components/utils/inputs/selectInput/SelectInput";
import NumberInput from "../../components/utils/inputs/NumberInput";
import FileInput from "../../components/utils/inputs/FileInput";
import ErrorPage from "../error/ErrorPage";

import "react-datepicker/dist/react-datepicker.css";

export interface RestaurantForm {
  name: string;
  address: string;
  district_id: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  phone: string;
  intro: string;
  startTime: Date | null;
  endTime: Date | null;
  dish_id: string;
  payment_method_id: string;
  opening_hours?: string;
  cover_image_url?: string;
  photo?: any;
}

const CreateRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<RestaurantForm>({
    defaultValues: {
      name: "",
      address: "",
      district_id: "",
      latitude: 0,
      longitude: 0,
      postal_code: "",
      phone: "",
      intro: "",
      startTime: null,
      endTime: null,
      dish_id: "",
      payment_method_id: "",
      photo: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const dishes = useSelector((state: IRootState) => state.dish.dishes);
  const districts = useSelector(
    (state: IRootState) => state.district.districts
  );
  const paymentMethods = useSelector(
    (state: IRootState) => state.paymentMethod.paymentMethods
  );
  const user = useSelector((state: IRootState) => state.auth.currentUser);

  useEffect(() => {
    const fetchDishes = async () => {
      if (user?.role !== "Admin") return;
      dispatch(getDishesThunk());
    };

    const fetchDistricts = async () => {
      if (user?.role !== "Admin") return;
      dispatch(getDistrictsThunk());
    };

    const fetchPaymentMethods = async () => {
      if (user?.role !== "Admin") return;
      dispatch(getPaymentMethodsThunk());
    };

    fetchDishes();
    fetchDistricts();
    fetchPaymentMethods();
  }, [user?.role, dispatch]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (sessionStorage.getItem("jwt")) {
        const res = await getCurrentUser();
        if (!res.user) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    fetchCurrentUser();
  }, [user, navigate]);

  const createNewRestaurant = async (
    restaurant: RestaurantForm,
    start_time: Date,
    end_time: Date,
    dish_id: string,
    payment_method_id: string
  ) => {
    restaurant.opening_hours = JSON.stringify({
      monday: { from: start_time, to: end_time },
      tuesday: { from: start_time, to: end_time },
      wednesday: { from: start_time, to: end_time },
      thursday: { from: start_time, to: end_time },
      friday: { from: start_time, to: end_time },
      saturday: { from: start_time, to: end_time },
      sunday: { from: start_time, to: end_time },
    });
    if (user?.user_id) {
      if (restaurant.photo) {
        const res = await createRestaurant(
          {
            name: restaurant.name,
            address: restaurant.address,
            district_id: restaurant.district_id,
            latitude: restaurant.latitude.toString(),
            longitude: restaurant.longitude.toString(),
            postal_code: restaurant.postal_code,
            phone: restaurant.phone,
            intro: restaurant.intro,
            opening_hours: restaurant.opening_hours,
          },
          fileTypeToExtension[restaurant.photo.type]
        );

        if (res.restaurant_id) {
          await uploadRestaurantCoverImage(
            restaurant.photo,
            res.restaurant_id as string,
            fileTypeToExtension[restaurant.photo.type]
          );

          dispatch(
            createRestaurantDishThunk({
              restaurant_id: res.restaurant_id,
              dish_id,
            })
          );

          dispatch(
            createRestaurantOwnerThunk({
              user_id: user?.user_id,
              restaurant_id: res.restaurant_id,
            })
          );

          dispatch(
            createRestaurantPaymentMethodThunk({
              restaurant_id: res.restaurant_id,
              payment_method_id,
            })
          );

          enqueueSnackbar("Restaurant is added successfully", {
            variant: "success",
          });
          setTimeout(() => {
            navigate(`/restaurant/id/${res.restaurant_id}`);
            navigate(0);
          }, 1000);
        }
      } else {
        enqueueSnackbar("Restaurant photo is required", { variant: "error" });
      }
    } else {
      enqueueSnackbar("You haven't login yet", { variant: "error" });
      setTimeout(() => {
        navigate(`/`);
        navigate(0);
      }, 1000);
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
  };

  return user?.role === "Admin" ? (
    <form
      className="flex flex-col gap-3 px-6 w-120 mx-auto"
      onSubmit={handleSubmit((restaurant) => {
        if (restaurant.startTime && restaurant.endTime) {
          createNewRestaurant(
            restaurant,
            restaurant.startTime,
            restaurant.endTime,
            restaurant.dish_id,
            restaurant.payment_method_id
          );
        }
      })}
    >
      <p className="col-span-2 text-center text-3xl font-bold">
        Create new restaurant
      </p>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Name"
            type="text"
            placeholder="Enter restaurant name"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Address"
            type="text"
            placeholder="Enter restaurant address"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="district_id"
        control={control}
        render={({ field }) => (
          <SelectInput
            label="District"
            placeholder="Select district"
            value={field.value}
            onChange={field.onChange}
            optionList={districts.map((district) => {
              return { label: district.name, value: district.district_id };
            })}
          />
        )}
      />
      <Controller
        name="latitude"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <NumberInput
            label="Latitude"
            step="0.1"
            placeholder="Enter restaurant latitude"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="longitude"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <NumberInput
            label="Longitude"
            step="0.1"
            placeholder="Enter restaurant longitude"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="postal_code"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Postal Code"
            type="text"
            placeholder="Enter restaurant postal code"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Phone"
            type="text"
            placeholder="Enter restaurant phone"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="intro"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextareaInput
            label="Introduction"
            placeholder="Enter restaurant introduction"
            value={field.value}
            onChange={field.onChange}
            className="border border-gray-400 p-2 rounded-md"
          />
        )}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Opening Hours</label>
        <div className="flex gap-2 items-center max-w-full">
          <div className="text-sm font-semibold">from</div>
          <div>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <div className="grow w-44">
                    <DatePicker
                      placeholderText="Opening Hour"
                      onChange={field.onChange}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="border-2 rounded-md p-1 w-full"
                    />
                  </div>
                );
              }}
            />
          </div>
          <div className="text-sm font-semibold">to</div>
          <div>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <div className="grow w-44">
                    <DatePicker
                      placeholderText="Closing Hour"
                      onChange={field.onChange}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="border-2 rounded-md p-1 w-full"
                    />
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
      <Controller
        name="dish_id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectInput
            label="Dish"
            placeholder="Select dish"
            value={field.value}
            onChange={field.onChange}
            optionList={dishes.map((dish) => {
              return { label: dish.name, value: dish.dish_id };
            })}
          />
        )}
      />
      <Controller
        name="payment_method_id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectInput
            label="Payment Method"
            placeholder="Select payment method"
            value={field.value}
            onChange={field.onChange}
            optionList={paymentMethods.map((paymentMethod) => {
              return {
                label: paymentMethod.name,
                value: paymentMethod.payment_method_id,
              };
            })}
          />
        )}
      />
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <FileInput
            onChange={(e) => {
              if (e.target.files) {
                const selectedFile = e.target.files[0];
                field.onChange(selectedFile);
              }
            }}
            label="Restaurant Cover Photo"
            type="file"
            className="form-control"
            placeholder=""
          />
        )}
      />
      <div className="flex flex-col items-center mb-2 text-sm">
        <button
          type="submit"
          className="bg-black px-4 py-2 rounded-md text-white font-bold hover:bg-opacity-70"
        >
          Add
        </button>
      </div>
    </form>
  ) : (
    <ErrorPage />
  );
};

export default CreateRestaurantPage;
