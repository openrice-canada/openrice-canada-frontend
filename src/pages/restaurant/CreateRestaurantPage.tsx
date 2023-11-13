import { Controller, useForm } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectInput from "../../components/Input/SelectInput";
import NumberInput from "../../components/Input/NumberInput";
import { TextareaInput } from "../../components/Input/TextareaInput";
import { Dish } from "../../api/dish/dishType";
import { District } from "../../api/district/districtType";
import { getDishes } from "../../api/dish/dishApiIndex";
import { getDistricts } from "../../api/district/districtApiIndex";
import { getPaymentMethods } from "../../api/payment/paymentApiIndex";
import { PaymentMethod } from "../../api/payment/paymentMethodType";
import {
  postRestaurant,
  postRestaurantDIsh,
  postRestaurantPaymentMethod,
} from "../../api/restaurant/restaurantApiIndex";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const CreateRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const user = useSelector((state: IRootState) => state.auth.currentUser);

  useEffect(() => {
    const fetchDishList = async () => {
      if (user?.role !== "Admin") return;
      const data = await getDishes();
      if (data) {
        setDishes(data);
      }
    };

    const fetchDistrictList = async () => {
      if (user?.role !== "Admin") return;
      const data = await getDistricts();
      setDistricts(data);
    };

    const fetchPaymentMethodList = async () => {
      if (user?.role !== "Admin") return;
      const data = await getPaymentMethods();
      setPaymentMethods(data);
    };

    fetchDishList();
    fetchDistrictList();
    fetchPaymentMethodList();
  }, [user?.role]);

  const newRestaurant = async (
    restaurant: {
      name: string;
      address: string;
      district_id: string;
      latitude: string;
      longitude: string;
      postal_code: string;
      phone: string;
      intro: string;
      opening_hours: string;
    },
    start_time: string,
    end_time: string,
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
    const res = await postRestaurant(restaurant);
    if (res.restaurant_id) {
      await postRestaurantDIsh({
        restaurant_id: res.restaurant_id,
        dish_id,
      });
      await postRestaurantPaymentMethod({
        restaurant_id: res.restaurant_id,
        payment_method_id,
      });
      enqueueSnackbar("Restaurant added successfully!", { variant: "success" });
      setTimeout(() => {
        navigate(`/restaurant/${res.restaurant_id}`);
        navigate(0);
      }, 1000);

      setTimeout(() => {
        closeSnackbar();
      }, 2000);
    }
  };

  return user?.role === "Admin" ? (
    <form
      className="grid grid-cols-2 gap-3 px-6"
      onSubmit={handleSubmit((restaurant) =>
        newRestaurant(
          restaurant as {
            name: string;
            address: string;
            district_id: string;
            latitude: string;
            longitude: string;
            postal_code: string;
            phone: string;
            intro: string;
            opening_hours: string;
          },
          restaurant.startTime,
          restaurant.endTime,
          restaurant.dishId,
          restaurant.paymentMethodId
        )
      )}
    >
      <p className="col-span-2 text-center text-3xl font-bold">
        Create new restaurant
      </p>
      <div className="col-span-1 justify-center p-3">
        <Controller
          name="name"
          control={control}
          defaultValue={""}
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
          defaultValue={""}
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
          name="districtId"
          control={control}
          defaultValue={""}
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
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput
              label="Latitude"
              step="0.0001"
              placeholder="Enter restaurant latitude"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="longitude"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput
              label="Longitude"
              step="0.0001"
              placeholder="Enter restaurant longitude"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="postalCode"
          control={control}
          defaultValue={""}
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
      </div>
      <div className="col-span-1 justify-center p-3">
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
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <TextareaInput
              label="Introduction"
              placeholder="Enter restaurant introduction"
              value={field.value}
              onChange={field.onChange}
              className="border border-gray-400 p-2 mt-1   rounded-md"
            />
          )}
        />
        <div className="flex flex-col">
          <label>Opening Hours</label>
          <div className="grid grid-cols-2">
            <div>
              <Controller
                name="start_time"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <>
                      <DatePicker
                        placeholderText="Opening Hour"
                        onChange={field.onChange}
                        selected={field.value}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name="end_time"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <>
                      <DatePicker
                        placeholderText="Closing Hour"
                        onChange={field.onChange}
                        selected={field.value}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <Controller
          name="dish_id"
          control={control}
          defaultValue={""}
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
          defaultValue={""}
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
      </div>
      <div className="flex flex-col items-center col-span-2">
        <button
          type="submit"
          className="bg-[#000000] px-4 py-2 rounded-md text-[#ffffff] font-bold"
        >
          Add
        </button>
      </div>
    </form>
  ) : (
    <div className="h-screen flex flex-col gap-6 justify-center max-w-3xl mx-auto">
      {" "}
      <h1 className="text-3xl font-bold text-red-600 text-center">
        You have no right to add new restaurant
      </h1>{" "}
    </div>
  );
};

export default CreateRestaurantPage;
