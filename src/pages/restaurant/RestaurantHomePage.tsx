import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";

import RestaurantCard from "../../components/card/RestaurantCard";
import SearchInput from "../../components/Input/SearchInput";
import { getRestaurantsByQuery } from "../../redux/restaurant/restaurantSlice";

const RestaurantHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector(
    (state: IRootState) => state.restaurant.restaurants
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: searchParams.get("search") || "",
    },
  });

  useEffect(() => {
    const fetchRestaurants = () => {
      dispatch(
        getRestaurantsByQuery({
          name: searchParams.get("search") || "",
        })
      );
    };

    fetchRestaurants();
  }, [searchParams, dispatch]);

  const handleSubmitSearch = (data: { name: string }) => {
    navigate(`/restaurants/?search=${data.name}`);
    navigate(0);
  };

  return (
    <>
      <form
        className="max-w-5xl mx-auto"
        onSubmit={handleSubmit(handleSubmitSearch)}
      >
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field: { value, onChange } }) => (
            <SearchInput
              type="text"
              placeholder="Search by restaurant name"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard {...restaurant} key={`restaurant${index}`} />
          ))}
        </div>
      </form>
    </>
  );
};

export default RestaurantHomePage;
