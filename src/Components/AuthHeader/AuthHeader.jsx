import React from "react";
import { GoHomeFill } from "react-icons/go";

const AuthHeader = () => {
  return (
    <div className="bg-white p-3 rounded-xl">
      <ul className="flex flex-warp gap-3">
        <li className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center ">
          <div className="flex items-center gap-2 ">
            <GoHomeFill />

            <span className="hidden md:block font-semibold">Home</span>
          </div>
        </li>
        <li className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center ">
          <div className="flex items-center gap-2 ">
            <GoHomeFill />

            <span className="hidden md:block font-semibold">Home</span>
          </div>
        </li>
        <li className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center ">
          <div className="flex items-center gap-2 ">
            <GoHomeFill />

            <span className="hidden md:block font-semibold">Home</span>
          </div>
        </li>
        <li className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center ">
          <div className="flex items-center gap-2 ">
            <GoHomeFill />

            <span className="hidden md:block font-semibold">Home</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AuthHeader;
