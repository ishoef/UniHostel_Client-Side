import React from "react";
import { Outlet } from "react-router";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";

const DashBoardContent = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 px-10 py-6 mb-10 bg-white dark:bg-gray-900 shadow text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome Back,{" "}
        <span className="text-primary dark:text-yellow-400 font-bold">
          {user.displayName}
        </span>
      </div>

      {/* Outlet Container */}
      <div className="border border-gray-300 dark:border-primary/20 rounded-xl p-3 mx-8 mb-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Outlet />
      </div>
    </>
  );
};

export default DashBoardContent;
