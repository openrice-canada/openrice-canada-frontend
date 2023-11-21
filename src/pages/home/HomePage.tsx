import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { getRestaurantsByQueryThunk } from "../../redux/restaurant/restaurantSlice";

import RestaurantCard from "../../components/card/RestaurantCard";
import SearchInput from "../../components/input/SearchInput";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector(
    (state: IRootState) => state.restaurant.restaurants
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      dispatch(getRestaurantsByQueryThunk({ limit: 6 }));
    };

    fetchRestaurants();
  }, [dispatch]);

  return (
    <div>
      <form
        className="relative h-96 flex justify-center items-center"
        onSubmit={handleSubmit((data) =>
          navigate(`/restaurants?search=${data.name}`)
        )}
      >
        <img
          src={process.env.PUBLIC_URL + "/hero.jpg"}
          alt="hero"
          className="absolute top-0 left-0 w-full h-full z-[-10] brightness-75 object-cover"
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="md:text-6xl text-4xl font-bold text-[#FFFFFF] text-center drop-shadow-xl mb-12">
            Discovered Restaurant <br />& Delicious Food
          </h1>
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <SearchInput
                type="text"
                placeholder="tacos, pizza, chinese"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </form>
      <div className="max-w-6xl mx-auto px-4 my-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center font-bold text-2xl">Latest Restaurants</h1>
          <Link
            className="text-slate-600 hover:text-slate-700 font-semibold hover:bg-slate-200 rounded-lg p-2"
            to="/restaurants"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard {...restaurant} key={restaurant.restaurant_id} />
          ))}
        </div>
      </div>
    </div>
  );
}
