import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import RestaurantOverviewPage from "./pages/restaurant/RestaurantOverviewPage";
import RestaurantHomePage from "./pages/restaurant/RestaurantHomePage";
import CreateRestaurantPage from "./pages/restaurant/CreateRestaurantPage";
import ProfilePage from "./pages/ProfilePage";

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
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
