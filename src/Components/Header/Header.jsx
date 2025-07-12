import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import { TiThMenu } from "react-icons/ti";
import { AuthContext } from "../../Context/AuthProvider";
import Logo from "../Logo/Logo";
import { LuLayoutDashboard } from "react-icons/lu";

const Header = () => {
  const { user, setUser, logOut } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // use it on the main parent div of the
  const location = useLocation();

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
            setUser(null);
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  // Close the dorpdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the dropdown on the route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className=" relative py-2 md:py-5 border-b border-b-gray-300 shadow">
        <div className="flex items-center justify-between w-11/12 lg:w-9/12 mx-auto">
          <Logo></Logo>

          <div className="middle hidden lg:block">
            <ul className="flex gap-1 text-[18px] font-semibold">
              <li>
                {" "}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded"
                  }
                >
                  Home
                </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink
                  to="/meals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded"
                  }
                >
                  Meals
                </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink
                  to="/upcommingmeals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded"
                  }
                >
                  Upcomming Meals
                </NavLink>{" "}
              </li>
            </ul>
          </div>

          <div className="flex gap-5 items-center">
            {user && (
              <div onClick={() => setMenuOpen((prev) => !prev)}>
                <img
                  className="cursor-pointer w-[40px] h-[40px] rounded-full border-2 border-green-600"
                  src={`${
                    user.photoURL
                      ? user.photoURL
                      : "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
                  }`}
                  alt=""
                />
              </div>
            )}

            {/* login & Logout Button */}
            {!user && (
              <Link to="/auth/login">
                <button className="btn btn-primary text-[16px] ">Join</button>
              </Link>
            )}

            {/* Small Device Dropdown Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn m-1">
                <TiThMenu />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  {" "}
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded"
                    }
                  >
                    Home
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink
                    to="/meals"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded"
                    }
                  >
                    Meals
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink
                    to="/upcommingmeals"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded"
                    }
                  >
                    Upcomming Meals
                  </NavLink>{" "}
                </li>
                <li>
                  {user && (
                    <button
                      onClick={handleLogOut}
                      className=" btn btn-primary mt-2"
                    >
                      Log Out
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-2 top-16 lg:right-60 lg:top-[70px] bg-white border border-gray-200 text-sm rounded shadow-md z-10"
          >
            <div className="border-b-2 border-b-gray-300 p-3 rounded-t">
              <p className="text-center text-primary text-xl">
                {user.displayName}
              </p>
              <p className="text-gray-400">{user.email}</p>
            </div>

            <ul className="p-4">
              <li className="border border-gray-200 rounded hover:bg-gray-300 py-2 text-center text-xl">
                <Link
                  to={"/admin_dashboard"}
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center gap-2">
                    <LuLayoutDashboard />
                    Dashboard
                  </div>
                </Link>
              </li>
              <li>
                {user && (
                  <button
                    onClick={handleLogOut}
                    className=" btn btn-primary w-full mt-2"
                  >
                    Log Out
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
