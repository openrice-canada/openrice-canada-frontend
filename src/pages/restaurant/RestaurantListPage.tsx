import { useCallback, useEffect, useState } from "react";
import { getRestaurantList } from "../../api/restaurant/restaurantApiIndex";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Restaurant } from "../../api/restaurant/RestaurantType";
import SearchInput from "../../components/Input/SearchInput";
import { Controller, useForm } from "react-hook-form";
import RestaurantCard from "../../components/card/RestaurantCard";

const RestaurantListPage = () => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [searchParams] = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: searchParams.get("search") || "",
    },
  });

  const fetchRestaurants = useCallback(async () => {
    const response = await getRestaurantList({
      name: searchParams.get("search") || "",
    });
    setRestaurantList(response);
  }, [searchParams]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleSubmitSearch = (data: { name: string }) => {
    navigate(`/restaurant/?search=${data.name}`);
    navigate(0);
  };

  return (
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
        {restaurantList.map((restaurant, index) => (
          <RestaurantCard {...restaurant} key={`restaurant${index}`} />
        ))}
      </div>
    </form>
  );
};

export default RestaurantListPage;
