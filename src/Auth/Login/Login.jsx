import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const { logIn, auth, setUser } = use(AuthContext);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    document.title = "App Godaun | login";
  }, []);

  // Manual Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((resutl) => {
        setUser(resutl.user);
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          title: "Congratulations! Welcome to Our World",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        const errorMessages = {
          "auth/invalid-email": "Please enter a valid email address.",
          "auth/user-not-found": "No account found with this email.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/invalid-credential": "Invalid email or password.",
          default: error.message,
        };
        const errorMessage = errorMessages[error.code] || errorMessages.default;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  // Google Login
  const provider = new GoogleAuthProvider();

  const handleloginWithGoogle = () => {
    setError(null);

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        console.log(result.user.displayName);
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          title: "Congratulations! Welcome to Our World",
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
        setError(message);
      });
  };

  // Forgot Password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    setError(null);

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        const errorMessages = {
          "auth/invalid-email": "The email address is badly formatted.",
          "auth/missing-email": "No email address provided.",
          "auth/user-not-found": "No user found with this email.",
          default: "Something went wrong. Please try again.",
        };

        const message = errorMessages[error.code] || errorMessages.default;
        toast.error(message);
        setError(message);
      });
  };

  return (
    <>
      <div className="w-[100%] lg:h-[100vh] flex justify-center items-center pt-5 lg:pt-0 bg-gray-200">
        <div className="flex flex-col justify-center items-center gap-5 lg:gap-10 p-3 lg:p-5 w-120">
          <h1 className="text-xl lg:text-3xl font-semibold">
            <span className="text-primary font-bold underline">Log in</span>{" "}
            Your Account
          </h1>
          <div className="w-full bg-white border border-gray-300 rounded-2xl p-6 lg:p-10">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className="text-xl font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:outline-primary border border-gray-400 rounded py-2 px-3"
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className="text-xl font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="focus:outline-primary border border-gray-400 rounded py-2 px-3"
                  placeholder="Enter Your password"
                  type="password"
                  name="password"
                  required
                />
              </div>

              {/* Error Massege */}
              <p className="text-red-600">{error}</p>

              {/* Remeber Me */}
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between md:mt-3 lg:mt-3">
                <label className="label" htmlFor="check">
                  <input
                    name="check"
                    type="checkbox"
                    className="checkbox"
                    required
                  />
                  <span>Remember me</span>
                </label>

                {/* Forgot Password */}
                <p className="text-blue-600">
                  <Link
                    onClick={handleForgotPassword}
                    className="hover:underline"
                  >
                    {" "}
                    Forgot Password?{" "}
                  </Link>
                </p>
              </div>
              <button className="btn bg-primary  text-white">Login</button>
            </form>

            <div className="divider">Or Continue with</div>

            {/* Google Login */}
            <div className="flex gap-2 justify-between">
              <button
                onClick={handleloginWithGoogle}
                className="btn border w-full"
              >
                <FcGoogle size={20} /> Countinue With Google
              </button>
            </div>
          </div>

          {/* Link To Register Page */}
          <p className="text-gray-400">
            Not a member?{" "}
            <Link to="/auth/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
