import React, { use, useEffect, useState } from "react";
import State from "../State/State";
import { LiaUsersSolid } from "react-icons/lia";
import { FaLayerGroup } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import useMeals from "../../../Hooks/useMeals/useMeals";
import useUpcommingMeals from "../../../Hooks/useUpcommingMeals/useUpcommingMeals";
import AllMeals from "../AllMeals/AllMeals";
import UpcomingMeals from "../../../Pages/UpCommingMeals/UpCommingMeals";
import UpcommingMeals from "../UpcommingMeals/UpcommingMeals";

const OverView = () => {
  const { user } = use(AuthContext);
  const [usersCount, setUsersCount] = useState([]);
  const { meals } = useMeals();
  const { upcommingMeals } = useUpcommingMeals();
  console.log(user);
  // Users Data
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsersCount(res.data.length))
      .catch((error) => {
        console.log("the error fetching the users", error);
        setUsersCount([]);
      });
  }, []);


  console.log(usersCount);

  const stateInfo = [
    {
      icon: <LiaUsersSolid />,
      title: "Total Users",
      count: `${usersCount}`,
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
      title: "Upcomming ",
      count: `${upcommingMeals.length}`,
      parcent: "80% increase in 20 days",
    },

    {
      icon: <FaLayerGroup />,
      title: "Served Meals",
      count: `${usersCount}`,
      parcent: "80% increase in 20 days",
    },
  ];

  return (
    <div>
      <div className="space-y-5 ">
        <h1 className="text-3xl font-semibold text-primary">Overview</h1>
        <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stateInfo.map((stat, index) => (
            <State key={index} info={stat}></State>
          ))}
        </div>
        <hr className="border border-gray-300 mt-10" />
        <AllMeals />
        <hr className="border border-gray-300 mt-10" />
        <UpcommingMeals />
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

export default OverView;
