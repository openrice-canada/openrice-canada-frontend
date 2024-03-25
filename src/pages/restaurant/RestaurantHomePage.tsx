import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { AppDispatch, IRootState } from "../../store";
import {
  getRestaurantsByDishThunk,
  getRestaurantsByQueryThunk,
} from "../../redux/restaurant/restaurantSlice";
import RestaurantCardSkeletonLoader from "../../components/skeletonLoader/RestaurantCardSkeletonLoader";
import RestaurantCard from "../../components/utils/cards/RestaurantCard";
import SearchInput from "../../components/utils/inputs/SearchInput";

const RestaurantHomePage = () => {
  const [loading, setLoading] = useState(true);

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
      if (!searchParams.get("dish")) {
        dispatch(
          getRestaurantsByQueryThunk({
            name: searchParams.get("search") || "",
          })
        );
      } else {
        dispatch(getRestaurantsByDishThunk(searchParams.get("dish")));
      }
    };

    fetchRestaurants();
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (
      restaurants.length > 6 &&
      (!searchParams.get("search") || !searchParams.get("dish"))
    ) {
      setLoading(false);
    }

    if (searchParams.get("search")) {
      setLoading(false);
    }

    if (searchParams.get("dish")) {
      setLoading(false);
    }
  }, [restaurants, searchParams]);

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
        {searchParams.get("dish") && (
          <div className="border-1 p-2 w-fit flex gap-2 rounded-md items-center mt-2">
            <div>{searchParams.get("dish")}</div>
            <span
              className="bg-transparent text-black text-2xl block outline-none focus:outline-none"
              onClick={() => {
                navigate("/restaurants");
              }}
            >
              <IoClose size={20} />
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {loading &&
            Array.from({
              length: 15,
            }).map((_, index) => (
              <RestaurantCardSkeletonLoader
                key={`loader ${index}`}
                width="330"
              />
            ))}
          {!loading &&
            restaurants.map((restaurant, index) => (
              <RestaurantCard {...restaurant} key={`restaurant${index}`} />
            ))}
        </div>
      </form>
    </>
  );
};

export default RestaurantHomePage;
