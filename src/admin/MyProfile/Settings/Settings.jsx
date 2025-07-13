import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { VscLayersActive } from "react-icons/vsc";

const Settings = () => {
  return (
    <div className="w-full border border-gray-300 rounded-2xl shadow  h-full flex justify-center items-center">
      <div className="my-10 flex gap-4 flex-col items-center justify-center px-10">
        <p className="text-primary">
          <IoSettingsOutline size={46} />
        </p>
        <p className="md:text-2xl poppins text-center">
          Settings System not built until now... <br /> it will be very soon
        </p>
      </div>
    </div>
  );
};

export default Settings;
