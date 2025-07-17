import { createBrowserRouter, Navigate } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Auth/Login/Login";
import Error from "../Pages/Error/Error";
import PrivateRoute from "./PrivateRoute";
import Meals from "../Pages/Meals/Meals";
import MealDetail from "../Pages/MealDetail/MealDetail";
import SignUpPage from "../Auth/SignUp/SignUp";
import UpcomingMeals from "../Pages/UpCommingMeals/UpCommingMeals";
import StudentDashBoard from "../admin/StudentsDashBoard/StudentDashBoard";
import Dashboard from "../admin/Dashboard/Dashboard";
import OverView from "../admin/Dashboard/OverView/OverView";
import Users from "../admin/Dashboard/Users/Users";
import CreatedGroups from "../admin/Dashboard/CreatedGroups/CreatedGroups";
import AddMealForm from "../Components/AllForms/AddMeal/AddMeal";
import UpcommingMeals from "../admin/Dashboard/UpcommingMeals/UpcommingMeals";
import AllMeals from "../admin/Dashboard/AllMeals/AllMeals";
import MyProfile from "../admin/MyProfile/MyProfile";
import Profile from "../admin/MyProfile/Profile/Profile";
import Activity from "../admin/MyProfile/Activity/Activity";
import Settings from "../admin/MyProfile/Settings/Settings";
import Privacy from "../admin/MyProfile/Privacy/Privacy";
import MakeAdmin from "../admin/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Components/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
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
        path: "/meal_details/:id",
        element: <MealDetail />,
      },
      {
        path: "/student_dashboard",
        Component: StudentDashBoard,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      // {
      //   path: "/admin_dashboard",
      //   element: (
      //     <PrivateRoute>
      //       <Dashboard />
      //     </PrivateRoute>
      //   ),
      //   children: [
      //     { index: true, element: <OverView /> },
      //     { path: "overview", element: <OverView /> },
      //     {
      //       path: "users",
      //       element: <Users />,
      //     },
      //     {
      //       path: "creategroup",
      //       element: <CreatedGroups />,
      //     },
      //     {
      //       path: "allMeals",
      //       element: <AllMeals />,
      //     },
      //     {
      //       path: "addmeal",
      //       element: <AddMealForm />,
      //     },
      //     {
      //       path: "upcomming_meals",
      //       element: <UpcommingMeals />,
      //     },
      //     {
      //       path: "dash_profile",
      //       element: <MyProfile />,
      //       children: [
      //         {
      //           index: true,
      //           element: <Navigate to="profile" />,
      //         },
      //         {
      //           path: "profile",
      //           element: <Profile />,
      //         },
      //         {
      //           path: "activity",
      //           element: <Activity />,
      //         },
      //         {
      //           path: "settings",
      //           element: <Settings />,
      //         },
      //         {
      //           path: "privacy",
      //           element: <Privacy />,
      //         },
      //       ],
      //     },
      //   ],
      // },
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
  {
    path: "/admin_dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <OverView /> },
      { path: "overview", element: <OverView /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "creategroup",
        element: <CreatedGroups />,
      },
      {
        path: "allMeals",
        element: <AllMeals />,
      },
      {
        path: "addmeal",
        element: (
          <AdminRoute>
            <AddMealForm />
            <AddMealForm />
          </AdminRoute>
        ),
      },
      {
        path: "upcomming_meals",
        element: <UpcommingMeals />,
      },
      {
        path: "makeadmin",
        Component: MakeAdmin,
      },
      {
        path: "dash_profile",
        element: <MyProfile />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "activity",
            element: <Activity />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "privacy",
            element: <Privacy />,
          },
        ],
      },
    ],
  },
]);
