import React from "react";
import { Outlet } from "react-router";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";

const DashBoardContent = () => {

  const { user } = useAuth();
  return (
    <>
      <div className="sticky top-0 z-10 px-10 py-6 mb-10 bg-white shadow text-3xl font-semibold">
        Welcome Back, <span className="text-primary font-bold">{user.displayName}</span>
      </div>
      <div className="border border-gray-300 dark:border-primary/20 rounded-xl p-3 mx-8 mb-10">
        <Outlet />
      </div>
    </>
  );
};

export default DashBoardContent;
