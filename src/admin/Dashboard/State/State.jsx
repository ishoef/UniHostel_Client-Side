import React from "react";

const State = ({ info }) => {

    const { title, count, parcent, icon } = info;

  return (
    <div className=" bg-primary dark:bg-gray-800 rounded shadow border-gray-400 p-5 flex gap-3">
      <div className=" flex justify-center items-center">
        <div className=" w-14 h-14 bg-white dark:bg-gray-700 text-primary rounded-full flex justify-center items-center text-3xl ">{icon}</div>
      </div>
      <div className=" w-full text-white dark:text-gray-300 space-y-2 ">
        <div className="text-2xl font-semibold  ">{title}</div>
        <div className="font-bold text-3xl ml-5">{count}</div>
        <div className="">{parcent}</div>
      </div>
    </div>
  );
};

export default State;
