import React from "react";
import { NavLink, Outlet } from "react-router";
import { LuUserRound } from "react-icons/lu";
import { VscLayersActive } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";

const MyProfile = () => {
  const navItems = [
    { name: "Profile", link: "profile", icon: <LuUserRound /> },
    {
      name: "Activity",
      link: "activity",
      icon: <VscLayersActive />,
    },
    {
      name: "Settings",
      link: "settings",
      icon: <IoSettingsOutline />,
    },
    {
      name: "Privacy",
      link: "privacy",
      icon: <MdOutlinePrivacyTip />,
    },
  ];

  return (
    <section className={`w-11/12 lg:w-9/12 mx-auto md:w-11/12 my-10`}>
      <div className=" mx-auto border border-gray-300 rounded-xl shadow p-3 md:p-5 flex flex-col gap-5">
        <div className="rounded p-1 bg-gray-100 ">
          <nav>
            <ul className="grid grid-cols-4 gap-1">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-center items-center bg-white text-primary font-semibold px-4 pb-2 pt-1 rounded"
                      : "flex justify-center items-center px-4 pb-2 pt-1 rounded hover:text-primary text-gray-400 poppins"
                  }
                >
                  <li>
                    <div className="flex items-center gap-1 my-2 md:my-0">
                      <span>{item.icon}</span>
                      <span className="hidden md:block">{item.name}</span>
                    </div>
                  </li>
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default MyProfile;
