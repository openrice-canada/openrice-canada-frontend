import { useEffect } from "react";
import { getRestaurantsByQuery } from "../../redux/restaurant/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";

import MapComponent from "../../components/map/MapComponent";
<<<<<<< Updated upstream
import { getRestaurantList } from "../../api/restaurant/restaurantApiIndex";
import { Restaurant } from "../../api/restaurant/RestaurantType";

const MapPage = () => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);

  const fetchRestaurantList = async () => {
    const data = await getRestaurantList({});
    setRestaurantList(data);
  };
=======

const MapPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector(
    (state: IRootState) => state.restaurant.restaurants
  );
>>>>>>> Stashed changes

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
