import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const navigate = useNavigate();

  const { createUser, setUser, updateUser, auth } = use(AuthContext);

  const [showError, setShowError] = useState(null);

  useEffect(() => {
    document.title = "App Godaun | Register";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(null);

    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 6;

    const errorMessages = {
      hasUppercase: "Password must contain at least one uppercase letter.",
      hasLowercase: "Password must contain at least one lowercase letter.",
      hasSpecialChar: "Password must contain at least one special character.",
      hasMinLength: "Password must be at least 6 characters long.",
    };

    if (!hasUppercase) {
      toast.error(errorMessages.hasUppercase);
      setShowError(errorMessages.hasUppercase);
      return;
    }
    if (!hasLowercase) {
      toast.error(errorMessages.hasLowercase);
      setShowError(errorMessages.hasLowercase);
      return;
    }
    // if (!hasSpecialChar) {
    //   toast.error(errorMessages.hasSpecialChar);
    //   setShowError(errorMessages.hasSpecialChar);
    //   return;
    // }
    if (!hasMinLength) {
      toast.error(errorMessages.hasMinLength);
      setShowError(errorMessages.hasMinLength);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser(user);
            console.log({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Account created successfully!");
          })
          .catch((error) => {
            const updateErrorMessages = {
              "auth/requires-recent-login":
                "Please re-login to update your profile.",
              default: "Failed to update profile. Please try again later.",
            };
            const message =
              updateErrorMessages[error.code] || updateErrorMessages.default;
            toast.error(message);
          });
      })
      .catch((error) => {
        const createErrorMessages = {
          "auth/email-already-in-use": "This email is already in use.",
          "auth/invalid-email": "The email address is invalid.",
          "auth/operation-not-allowed":
            "Email/password accounts are not enabled.",
          "auth/weak-password":
            "Password is too weak. Use at least 6 characters.",
          "auth/missing-password": "Please enter a password.",
          "auth/missing-email": "Please enter an email address.",
          default: "An unexpected error occurred. Please try again.",
        };
        const message =
          createErrorMessages[error.code] || createErrorMessages.default;
        toast.error(message);
        setShowError(message);
      });
  };

  // Googl Login
  const provider = new GoogleAuthProvider();

  const handleloginWithGoogle = () => {
    setShowError(null);

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
        setShowError(message);
      });
  };

  return (
    <>
      <div className="w-[100%] flex justify-center items-center py-10 lg:py-20 bg-gray-200">
        <div className="flex flex-col justify-center items-center gap-5 lg:gap-10 p-3 lg:p-5 w-120">
          <h1 className="text-xl lg:text-3xl font-semibold">
            <span className="text-primary font-bold underline">Register</span>{" "}
            Your Account
          </h1>
          <div className="w-full bg-white border border-gray-300 rounded-2xl p-6 lg:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className="text-xl font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  className="focus:outline-primary border border-gray-400 rounded py-2 px-3"
                  placeholder="Enter Your Name"
                  type="text"
                  name="name"
                  required
                />
              </div>

              {/* PhotoUrl */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className="text-xl font-semibold" htmlFor="photoUrl">
                  Photo URL
                </label>
                <input
                  className="focus:outline-primary border border-gray-400 rounded py-2 px-3"
                  placeholder="Photo URL"
                  type="text"
                  name="photoUrl"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className=" text-xl font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:outline-primary border border-gray-400 rounded py-2 px-3"
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <label className=" text-xl font-semibold" htmlFor="password">
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

              <p className="text-red-600">{showError}</p>

              <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between gap-2 lg:gap-4">
                <label className="label">
                  <input
                    name=" check"
                    type="checkbox"
                    className="checkbox"
                    required
                  />
                  <span>Remember me</span>
                </label>
                <p className="text-blue-600">
                  <Link>Forgot Password?</Link>
                </p>
              </div>

              <button className="btn w-full bg-primary text-white">
                Register
              </button>
            </form>

            <div className="divider">Or Continue with</div>

            <button
              onClick={handleloginWithGoogle}
              className="btn border w-full"
            >
              <FcGoogle /> Google
            </button>
          </div>
          <p className="text-gray-400">
            You Already Have an Account?{" "}
            <Link to="/auth/login" className="text-blue-600 underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
