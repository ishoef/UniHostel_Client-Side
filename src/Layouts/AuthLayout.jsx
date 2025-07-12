import React, { use, useState } from "react";
import SignUp from "../Auth/SignUp/SignUp";
import SignIn from "../Auth/SignIn/SignIn";
import Logo from "../Components/Logo/Logo";
import AuthHeader from "../Components/AuthHeader/AuthHeader";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios";

export default function AuthPage() {
  const [tab, setTab] = useState("signup"); // or "signin"

  const { auth } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  // Google Login
  const provider = new GoogleAuthProvider();

  const handleloginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);

        // user info in the database
        const userInfo = {
          email: user.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        const res = axiosInstance.post("/users", userInfo);
        console.log(res);

        navigate(`${location.state ? location.state : "/"}`);

        Swal.fire({
          title: "Congratulation! Welcome to Our World",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        const errorMessages = {
          "auth/popup-blocked":
            "The popup was blocked by the browser. Please allow popups and try again.",
          "auth/popup-closed-by-user":
            "The popup was closed before completing sign in.",
          "auth/cancelled-popup-request":
            "Only one popup request is allowed at a time. Please try again.",
          "auth/operation-not-allowed":
            "Google sign-in is not enabled. Please contact support.",
          "auth/account-exists-with-different-credential":
            "An account already exists with the same email but different sign-in credentials.",
          default: "Google sign-in failed. Please try again.",
        };

        const message = errorMessages[error.code] || errorMessages.default;
        toast.error(message);
      });
  };

  return (
    <div className="min-h-screen bg-[#FFF4EC] flex items-center justify-between flex-col p-4">
      <div className="basis-1/4">
        <AuthHeader />
      </div>
      <div className="basis-2/4 flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info Left Side */}
          <div className="flex flex-col gap-3 justify-center px-4 sm:px-6 py-6 sm:py-10">
            <div className="hidden md:block">
              <Logo />
            </div>
            <hr className="hidden md:block w-32 sm:w-44 border-2 border-primary" />
            <h2 className="text-center md:text-start text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#111827]">
              Welcome to the Campus of{" "}
              <span className=" bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                UniHostel
              </span>
            </h2>
            <p className="hidden md:block text-gray-700 mb-6 text-sm sm:text-base">
              Join thousands of users who trust SwiftParcel for fast, secure,
              and reliable parcel delivery services.
            </p>
            <ul className="space-y-4 hidden md:block">
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] text-sm sm:text-base">
                    Secure & Trusted
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Your packages are fully insured and tracked
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 10h11M9 21V3m7 13h5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] text-sm sm:text-base">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Same-day and express delivery options
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] text-sm sm:text-base">
                    Real-time Tracking
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Monitor your parcel every step of the way
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Form Section */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-center mb-1">
              Join UniHostel
            </h2>
            <p className="text-xs sm:text-sm text-center text-gray-500 mb-6">
              Join UniHostel and Enjoy Our Juicy Meals
            </p>
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => setTab("signin")}
                className={`w-1/2 py-2 rounded-md text-sm font-medium ${
                  tab === "signin"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`w-1/2 py-2 rounded-md text-sm font-medium ${
                  tab === "signup"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>
            <div>{tab === "signup" ? <SignUp /> : <SignIn />}</div>
            <p className="text-center divider">or</p>
            <button onClick={handleloginWithGoogle} className="btn w-full">
              {" "}
              <FcGoogle />
              Google
            </button>
          </div>
        </div>
      </div>
      <div className="basis-1/4"></div>
    </div>
  );
}
