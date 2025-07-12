import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Error from "../Pages/Error/Error";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import Meals from "../Pages/Meals/Meals";
import UpCommingMeals from "../Pages/UpCommingMeals/UpCommingMeals";
import MealDetail from "../Pages/MealDetail/MealDetail";
import SignUpPage from "../Auth/SignUp/SignUp";
import UpcomingMeals from "../Pages/UpCommingMeals/UpCommingMeals";
import StudentDashBoard from "../admin/StudentsDashBoard/StudentDashBoard";
import Dashboard from "../admin/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/upcommingmeals",
        Component: UpcomingMeals,
      },
      {
        path: "/meals",
        Component: Meals,
      },
      {
        path: "/details",
        Component: MealDetail,
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/student_dashboard",
        Component: StudentDashBoard,
      },
      {
        path: "/admin_dashboard",
        Component: Dashboard,
      }
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/register",
        Component: SignUpPage,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
]);
