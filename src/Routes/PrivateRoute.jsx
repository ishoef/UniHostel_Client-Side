import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import NormalLoader from "../Components/Loader/NormalLoader";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <NormalLoader></NormalLoader>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
