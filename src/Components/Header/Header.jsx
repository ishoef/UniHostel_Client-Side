import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import { TiThMenu } from "react-icons/ti";
import { AuthContext } from "../../Context/AuthProvider";
import Logo from "../Logo/Logo";
import { LuLayoutDashboard } from "react-icons/lu";
import useUserByEmail from "../../Hooks/useUserByEmail/useUserByEmail";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Header = () => {
  const { user, setUser, logOut } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // use it on the main parent div of the
  const location = useLocation();
  const { data: currentUser } = useUserByEmail(user?.email);

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
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <header className="relative py-2 md:py-5 border-b border-gray-300 dark:border-gray-700 shadow">
        <div className="flex items-center justify-between w-11/12 lg:w-9/12 mx-auto">
          <Logo />

          <div className="middle hidden lg:block">
            <ul className="flex gap-1 text-[18px] font-semibold">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/meals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                  }
                >
                  Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcommingmeals"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                  }
                >
                  Upcomming Meals
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex gap-5 items-center">
            <DarkModeToggle />
            {user && (
              <div onClick={() => setMenuOpen((prev) => !prev)}>
                <img
                  className="cursor-pointer w-[40px] h-[40px] rounded-full border-2 border-green-600"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
                  }
                  alt=""
                />
              </div>
            )}
            {currentUser?.isSubscribed && (
              <p className="inline-block bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                {currentUser?.plan}
              </p>
            )}

            {!user && (
              <Link to="/auth/login">
                <button className="btn btn-primary text-[16px]">Join</button>
              </Link>
            )}

            {/* Small Device Dropdown Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn m-1">
                <TiThMenu />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white dark:bg-gray-800 rounded-box z-10 w-52 p-2 shadow-md"
              >
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/meals"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                    }
                  >
                    Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/upcommingmeals"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                        : "bg-none px-4 pb-2 pt-1 rounded text-gray-800 dark:text-gray-200"
                    }
                  >
                    Upcomming Meals
                  </NavLink>
                </li>
                <li>
                  {user && (
                    <button
                      onClick={handleLogOut}
                      className="btn btn-primary mt-2 w-full"
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
            className="absolute right-2 top-16 lg:right-60 lg:top-[70px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded shadow-md z-10"
          >
            <div className="border-b-2 border-gray-300 dark:border-gray-700 p-3 rounded-t">
              <p className="text-center text-primary text-xl">
                {user.displayName}
              </p>
              <p className="text-gray-400 dark:text-gray-300">{user.email}</p>
            </div>

            <ul className="p-4">
              <li className="border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-700 py-2 text-center text-xl">
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
                    className="btn btn-primary w-full mt-2"
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
