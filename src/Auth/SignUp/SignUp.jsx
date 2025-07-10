import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { CiCircleAlert } from "react-icons/ci";

const SignUp = () => {
  const { createUser, setUser } = use(AuthContext);
  const [showError, setShowError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i am clicked");

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const tel = e.target.tel.value;
    const password = e.target.password.value;

    console.log(firstName, lastName, email, tel, password);

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
        console.log("after create user", result);
        setUser(result.user);
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
        // setShowError(message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        {/* first Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-[#111827]"
          required
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-[#111827]"
          required
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
        required
      />

      {/* Phone Number */}
      <input
        type="tel"
        name="tel"
        placeholder="Phone Number"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
        required
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Create a strong password"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
        required
      />
      <p className="text-red-400 flex items-center gap-2">
        {/* <CiCircleAlert /> */}
        {showError}
      </p>
      {/* Terms Of Service */}
      <div className="flex items-start text-sm text-[#111827]">
        <input type="checkbox" className="mr-2 mt-1" />
        <label>
          I agree to the{" "}
          <a href="#" className="text-[#F97316] font-medium hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#F97316] font-medium hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:bg-[#1f2937]">
        Create Account
      </button>
    </form>
  );
};

export default SignUp;
