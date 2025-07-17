import React from "react";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router";

const AuthHeader = () => {
  return (
    <div className="bg-white p-3 rounded-xl">
      <ul className="flex flex-warp gap-3">
        <li>
          <Link
            to="/"
            className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center "
          >
            <div className="flex items-center gap-2 ">
              <GoHomeFill />

              <span className="hidden md:block font-semibold">Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/meals"
            className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center "
          >
            <div className="flex items-center gap-2 ">
              <GoHomeFill />

              <span className="hidden md:block font-semibold">Meals</span>
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/upcommingmeals"
            className="bg-[#FFF4EC] px-8 py-4 rounded-md flex justify-center items-center "
          >
            <div className="flex items-center gap-2 ">
              <GoHomeFill />

              <span className="hidden md:block font-semibold">
                Upcomming Meals
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthHeader;
