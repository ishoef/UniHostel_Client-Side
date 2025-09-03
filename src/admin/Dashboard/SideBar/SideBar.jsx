import React, { useContext } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  FaCreditCard,
  FaHome,
  FaLayerGroup,
  FaStar,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { PiHamburgerFill, PiUsersThreeBold } from "react-icons/pi";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { MdAdminPanelSettings, MdLogout } from "react-icons/md";
import { TbComet } from "react-icons/tb";
import { ImSpoonKnife } from "react-icons/im";
import useUserRole from "../../../Hooks/UseUserRole/UseUserRole";

const SideBar = () => {
  const { logOut, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      confirmButtonText: "Yes, log out!",
      confirmButtonColor: "#14b8a6",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged out!", "You have been logged out.", "success");
            setUser(null); // Clear user state
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };
  const { role, roleLoading } = useUserRole();

  const adminSidebarLinks = [
    {
      to: "overview",
      icon: <AiOutlineDashboard size={22} />,
      label: "Overview",
      roleRequired: "admin",
    },
    {
      to: "users",
      icon: <PiUsersThreeBold size={22} />,
      label: "All Users",
      roleRequired: "admin",
    },
    {
      to: "addmeal",
      icon: <IoCreate size={22} />,
      label: "Add Meal",
      roleRequired: "admin",
    },
    {
      to: "allMeals",
      icon: <PiHamburgerFill size={22} />,
      label: "All Meals",
      roleRequired: "admin",
    },
    {
      to: "all_reviews",
      icon: <FaStar size={22} />,
      label: "All Reviews",
      roleRequired: "admin",
    },
    {
      to: "serve_meals",
      icon: <ImSpoonKnife size={22} />,
      label: "Serve Meals",
      roleRequired: "admin",
    },
    {
      to: "upcomming_meals",
      icon: <TbComet size={22} />,
      label: "Upcomming Meals",
      roleRequired: "admin",
    },
    {
      to: "makeadmin",
      icon: <MdAdminPanelSettings size={22} />,
      label: "Make Admin",
      roleRequired: "admin",
    },
    {
      to: "dash_profile",
      icon: <FaUser size={22} />,
      label: "My Profile",
      roleRequired: "user",
    },
  ];

  const userSidebarLinks = [
    {
      to: "dash_profile",
      icon: <FaUser size={22} />,
      label: "My Profile",
      roleRequired: "user",
    },
    {
      to: "my_rquested_meals",
      icon: <FaUtensils size={22} />,
      label: "Requested Meals",
      roleRequired: "user",
    },
    {
      to: "my_reviews",
      icon: <FaStar size={22} />,
      label: "My Reviews",
      roleRequired: "user",
    },
    {
      to: "payments",
      icon: <FaCreditCard size={22} />,
      label: "Payment History",
      roleRequired: "user",
    },
  ];

  return (
    <div className="sticky top-0 md:border h-screen overflow-y-auto border-gray-300 dark:border-primary/20 md:p-3 flex flex-col shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-primary dark:text-yellow-400 mb-3 text-center text-2xl font-semibold">
        Dashboard Menu
      </h1>
      <hr className="mb-4 border-gray-300 dark:border-primary/20" />
      <div className="flex flex-col h-full justify-between">
        <nav>
          <ul className="flex flex-col items-center gap-3">
            {!roleLoading &&
              role === "admin" &&
              adminSidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="border w-full border-gray-300 dark:border-primary/20 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2"
                >
                  <p className="flex items-center justify-center md:justify-start gap-3">
                    {link.icon}
                    <span className="hidden md:block">{link.label}</span>
                  </p>
                </Link>
              ))}
            {!roleLoading &&
              role === "user" &&
              userSidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="border w-full border-gray-300 dark:border-primary/20 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2"
                >
                  <p className="flex items-center justify-center md:justify-start gap-3">
                    {link.icon}
                    <span className="hidden md:block">{link.label}</span>
                  </p>
                </Link>
              ))}
          </ul>
        </nav>

        <div className="space-y-4 mt-4">
          <Link
            to={"/"}
            className="bg-transparent text-primary dark:text-yellow-400 w-full btn flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary"
          >
            <p className="flex items-center gap-2">
              <FaHome size={20} />
              <span className="hidden md:block">Go Home</span>
            </p>
          </Link>
          <button
            onClick={handleLogOut}
            className="w-full btn flex justify-center items-center bg-primary text-white dark:bg-yellow-400 dark:text-gray-900 hover:bg-primary/90 dark:hover:bg-yellow-500"
          >
            <p className="flex items-center gap-2">
              <MdLogout size={20} />
              <span className="hidden md:block">Log Out</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
