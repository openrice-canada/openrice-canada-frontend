import { Outlet, createBrowserRouter } from "react-router-dom";
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
import RestaurantHomePage from "./pages/restaurant/RestaurantHomePage";
import CreateRestaurantPage from "./pages/restaurant/CreateRestaurantPage";

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
          path: "/review/id/:id",
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
          path: "/restaurant",
          element: <Outlet />,
          children: [
            {
              path: "id/:id",
              element: <RestaurantOverviewPage />,
            },
            {
              path: "create",
              element: <CreateRestaurantPage />,
            },
          ],
        },
        {
          path: "/restaurants",
          element: <RestaurantHomePage />,
        },
        {
          path: "/menu",
          element: <MenuPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
