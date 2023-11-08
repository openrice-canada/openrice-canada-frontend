import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ReviewPage from "./pages/review/ReviewPage";
import UserInputPage from "./pages/review/UserInputPage";
import MapPage from "./pages/map/MapPage";
import LoginPage from "./pages/login/LoginPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signUp/SignUpPage";
import RestaurantOverviewPage from "./pages/restaurant/RestaurantOverviewPage";
import MenuPage from "./pages/menu/MenuPage";
import RestaurantListPage from "./pages/restaurant/RestaurantListPage";
import NewRestaurantPage from "./pages/restaurant/NewRestaurantPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/review/:id",
          element: <ReviewPage />,
        },
        {
          path: "/user-input",
          element: <UserInputPage />,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
        {
          path: "/restaurant/:id",
          element: <RestaurantOverviewPage />,
        },
        {
          path: "/restaurant",
          element: <RestaurantListPage />,
        },
        {
          path: "/menu",
          element: <MenuPage />,
        },
        {
          path: "/new-restaurant",
          element: <NewRestaurantPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
