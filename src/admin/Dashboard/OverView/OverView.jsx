import React from "react";
import State from "../State/State";
import { LiaUsersSolid } from "react-icons/lia";
import { FaLayerGroup } from "react-icons/fa";
import useMeals from "../../../Hooks/useMeals/useMeals";
import useUpcommingMeals from "../../../Hooks/useUpcommingMeals/useUpcommingMeals";
import AllMeals from "../AllMeals/AllMeals";
import UpcommingMeals from "../UpcommingMeals/UpcommingMeals";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const OverView = () => {
  const { meals } = useMeals();
  const { upcommingMeals } = useUpcommingMeals();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch Users Count
  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.users || [];
    },
  });

  // ✅ Fetch Served Meals Count
  const { data: servedMealsCount = 0, isLoading: servedLoading } = useQuery({
    queryKey: ["servedMealsCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meal-requests");
      return res.data.pagination.total || 0;
    },
  });

  const stateInfo = [
    {
      icon: <LiaUsersSolid />,
      title: "Total Users",
      count: `${usersData.length}`,
      parcent: "80% increase in 20 days",
    },
    {
      icon: <FaLayerGroup />,
      title: "Total Meals",
      count: `${meals.length}`,
      parcent: "80% increase in 20 days",
    },
    {
      icon: <FaLayerGroup />,
      title: "Upcomming",
      count: `${upcommingMeals.length}`,
      parcent: "80% increase in 20 days",
    },
    {
      icon: <FaLayerGroup />,
      title: "Served Meals",
      count: `${servedMealsCount}`,
      parcent: "80% increase in 20 days",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="space-y-5 px-4 md:px-8 py-6">
        <h1 className="text-3xl font-semibold text-primary dark:text-orange-400">
          Overview
        </h1>

        {/* ✅ Loading UI (Optional) */}
        {usersLoading || servedLoading ? (
          <p>Loading overview data...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stateInfo.map((stat, index) => (
              <State key={index} info={stat} />
            ))}
          </div>
        )}

        <hr className="border-gray-300 dark:border-gray-700 mt-10" />
        <AllMeals />
        <hr className="border-gray-300 dark:border-gray-700 mt-10" />
        <UpcommingMeals />
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

export default OverView;
