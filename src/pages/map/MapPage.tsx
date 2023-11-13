import { useEffect } from "react";
import { getRestaurantsByQuery } from "../../redux/restaurant/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";

import MapComponent from "../../components/map/MapComponent";

const MapPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector(
    (state: IRootState) => state.restaurant.restaurants
  );

  useEffect(() => {
    const fetchRestaurantList = async () => {
      dispatch(getRestaurantsByQuery({}));
    };

    fetchRestaurantList();
  }, [dispatch]);

  return (
    <MapComponent
      coordinates={restaurants
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
