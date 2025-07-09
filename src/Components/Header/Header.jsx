import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { TiThMenu } from "react-icons/ti";
import { AuthContext } from "../../Context/AuthProvider";
import Logo from "../Logo/Logo";
import SectionContent from "../SectionContent/SectionContent";

const Header = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        //  alert("you are loged out successfully");
        Swal.fire({
          title: "You Are Loged Out!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <header className="relative py-5 border-b border-b-gray-300 shadow">
        
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

                {/* <li>
                {" "}
                <NavLink
                  to={user ? "/myprofile" : "/auth/login"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                      : "bg-none px-4 pb-2 pt-1 rounded"
                  }
                >
                  My Profile
                </NavLink>{" "}
              </li> */}
              </ul>
            </div>

            <div className="flex gap-5 items-center">
              {user ? (
                <Link to="/myprofile">
                  <div
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-full border-2 border-green-600"
                      src={`${
                        user.photoURL
                          ? user.photoURL
                          : "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
                      }`}
                      alt=""
                    />
                  </div>
                </Link>
              ) : (
                ""
              )}

              {/* login & Logout Button */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="hidden lg:block btn btn-primary"
                >
                  Log Out
                </button>
              ) : (
                <Link to="/auth/login">
                  <button className="btn btn-primary text-[16px] ">
                    Login
                  </button>
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
                      to="/demopage"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                          : "bg-none px-4 pb-2 pt-1 rounded"
                      }
                    >
                      DemoPage
                    </NavLink>{" "}
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      to="/demopage2"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                          : "bg-none px-4 pb-2 pt-1 rounded"
                      }
                    >
                      DemoPage2
                    </NavLink>{" "}
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      to="/demopage3"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                          : "bg-none px-4 pb-2 pt-1 rounded"
                      }
                    >
                      DemoPage3
                    </NavLink>{" "}
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      to={user ? "/myprofile" : "/auth/login"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white px-4 pb-2 pt-1 rounded"
                          : "bg-none px-4 pb-2 pt-1 rounded"
                      }
                    >
                      My Profile
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
          {showTooltip && (
            <div className="absolute right-2 top-16 lg:right-60 lg:top-[70px] bg-primary text-white text-sm px-4 py-5 rounded shadow-md z-10">
              <p className="text-end text-xl">{user.displayName}</p>
              <p>{user.email}</p>
            </div>
          )}
        
      </header>
    </>
  );
};

export default Header;
