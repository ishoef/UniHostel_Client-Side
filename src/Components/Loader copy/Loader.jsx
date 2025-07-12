import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[62vh] p-5 bg-gray-100 w-full my-5 rounded-2xl">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
