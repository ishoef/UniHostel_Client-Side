import React, { use, useEffect, useState } from "react";
import State from "../State/State";
import { LiaUsersSolid } from "react-icons/lia";
import { FaLayerGroup } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";

const OverView = () => {
  const { user } = use(AuthContext);
  const [usersCount, setUsersCount] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  
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

  // All Groups Data
  useEffect(() => {
    fetch("https://hobby-shop-server.vercel.app/groups")
      .then((res) => res.json())
      .then((data) => {
        setAllGroups(data);
      })
      .catch((error) => {
        console.log("Failed to fetch groups data:", error);
        setAllGroups([]);
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
      title: "Total Groups",
      count: `${allGroups.length}`,
      parcent: "80% increase in 20 days",
    },

    {
      icon: <FaLayerGroup />,
      title: "My Groups",
      count: `${usersCount}`,
      parcent: "80% increase in 20 days",
    },

    {
      icon: <FaLayerGroup />,
      title: "Users Groups",
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
      </div>
      <div className="mt-10">
        
      </div>
    </div>
  );
};

export default OverView;
