import React, { use, useEffect, useState } from "react";
import State from "../State/State";
import { LiaUsersSolid } from "react-icons/lia";
import { FaLayerGroup } from "react-icons/fa";
import Users from "../Users/Users";
import { AuthContext } from "../../../Context/AuthProvider";
import MyGroupess from "../myGroupsss/MyGroupss";
import AllGroupssTable from "../AllGroupssTable/AllGroupssTable";

const OverView = () => {
  const { user } = use(AuthContext);

  const [allGroups, setAllGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);

  // // Users Data
  // useEffect(() => {
  //   fetch("https://hobby-shop-server.vercel.app/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsersCount(data))
  //     .catch((error) => {
  //       console.log("the error fetching the users", error);
  //     });
  // }, []);

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

  useEffect(() => {
    if (user && user.email) {
      fetch(
        `https://hobby-shop-server.vercel.app/groups?userEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyGroups(data);
        })
        .catch((err) => {
          console.error("Failed to fetch user groups:", err);
          setMyGroups([]);
        });
    } else {
      // If user not ready yet, keep loading or handle it here
      setMyGroups([]);
    }
  }, [user]);

  // console.log(usersCount.length);

  const usersGroup = allGroups.length - myGroups.length;
  console.log(usersGroup);

  const stateInfo = [
    {
      icon: <LiaUsersSolid />,
      title: "Total Users",
      count: 20,
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
      count: `${myGroups.length}`,
      parcent: "80% increase in 20 days",
    },

    {
      icon: <FaLayerGroup />,
      title: "Users Groups",
      count: `${usersGroup}`,
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
        {/* <Users /> */}
        <MyGroupess />
      </div>
    </div>
  );
};

export default OverView;
