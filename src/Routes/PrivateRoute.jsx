import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import NormalLoader from "../Components/Loader copy/NormalLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <NormalLoader ></NormalLoader>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
