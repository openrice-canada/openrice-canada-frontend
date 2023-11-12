import { useEffect, useState } from "react";
import MapComponent from "../../components/map/MapComponent";
import { getRestaurants } from "../../api/restaurant/restaurantApiIndex";
import { Restaurant } from "../../api/restaurant/RestaurantType";

const MapPage = () => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);

  const fetchRestaurantList = async () => {
    const data = await getRestaurants({});
    setRestaurantList(data);
  };

  useEffect(() => {
    fetchRestaurantList();
  }, []);

  return (
    <MapComponent
      coordinates={restaurantList
        .filter((restaurant) => restaurant.latitude && restaurant.longitude)
        .map((restaurant) => ({
          name: restaurant.name,
          latitude: parseFloat(restaurant.latitude),
          longitude: parseFloat(restaurant.longitude),
        }))}
    />
  );
};

export default MapPage;
