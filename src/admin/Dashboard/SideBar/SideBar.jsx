import React, { useContext } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { LiaLayerGroupSolid, LiaUsersSolid } from "react-icons/lia";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";

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

  return (
    <div className="sticky top-24 md:border h-[calc(100vh-9rem)] overflow-y-auto border-gray-300 dark:border-primary/10 rounded-xl md:p-3 flex flex-col">
      <h1 className="text-primary mb-3 text-center text-2xl font-semibold ">
        Dashboard Menu
          </h1>
          <hr className="mb-4 border border-gray-300"/>
      <div className="flex flex-col h-full justify-between">
        <nav>
          <ul className="flex flex-col items-center gap-3 ">
            <Link
              to={"/dashboard/overview"}
              className="border w-full border-gray-300 dark:border-primary/10 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2 "
            >
              <p className="flex items-center justify-center md:justify-start gap-3">
                <AiOutlineDashboard size={22} color="#ff6b35" />
                <span className="hover:text-primary hidden md:block">
                  Overview
                </span>
              </p>
            </Link>

            <Link
              to={"/dashboard/allgroups"}
              className="border w-full border-gray-300 dark:border-primary/10 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2 "
            >
              <p className="flex items-center justify-center md:justify-start gap-3">
                <LiaLayerGroupSolid size={22} color="#ff6b35" />
                <span className="hover:text-primary hidden md:block">
                  All Groups
                </span>
              </p>
            </Link>

            {/* <Link
              to={"/dashboard/users"}
              className="border w-full border-gray-300 dark:border-primary/10 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2 "
            >
              <p className="flex items-center justify-center md:justify-start gap-3">
                <PiUsersThreeBold size={22} color="#ff6b35" />
                <span className="hover:text-primary hidden md:block">
                  All Users
                </span>
              </p>
            </Link> */}

            <Link
              to="/dashboard/mygroups"
              className="border w-full border-gray-300 dark:border-primary/10 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2 "
            >
              <p className="flex items-center justify-center md:justify-start gap-3">
                <FaLayerGroup size={20} color="#ff6b35" />
                <span className="hover:text-primary hidden md:block">
                  My Groups
                </span>
              </p>
            </Link>

            <Link
              to="/dashboard/creategroup"
              className="border w-full border-gray-300 dark:border-primary/10 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary p-2 "
            >
              <p className="flex items-center justify-center md:justify-start gap-3">
                <IoCreate size={22} color="#ff6b35" />
                <span className="hover:text-primary hidden md:block">
                  Create Groupe
                </span>
              </p>
            </Link>
          </ul>
        </nav>

        <button
          onClick={handleLogOut}
          className=" w-full btn btn-primary flex justify-center items-center"
        >
          <p className="flex items-center gap-2">
            {" "}
            <MdLogout size={20} />
            <span className="hidden md:block">Log Out</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
