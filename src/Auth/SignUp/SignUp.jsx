import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password toggle
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const SignUp = () => {
  const { createUser, setUser } = use(AuthContext);
  const [showError, setShowError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxios();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i am clicked");

    console.log("before create user", e.target.firstName.value);

    // Retrieve form field values
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const tel = e.target.tel.value;
    const password = e.target.password.value;
    const agreed = e.target.agreed.checked;
    const name = firstName + lastName;
    console.log(name);

    console.log(firstName, lastName, email, tel, password, agreed);

    // Password validation rules
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    // Error messages for password validation
    const errorMessages = {
      hasUppercase: "Password must contain at least one uppercase letter.",
      hasLowercase: "Password must contain at least one lowercase letter.",
      hasSpecialChar: "Password must contain at least one special character.",
      hasMinLength: "Password must be at least 6 characters long.",
    };

    // Validate password and show error if any rule fails
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
    if (!hasMinLength) {
      toast.error(errorMessages.hasMinLength);
      setShowError(errorMessages.hasMinLength);
      return;
    }

    // Call createUser from AuthContext
    createUser(email, password)
      .then(async (result) => {
        console.log("after create user", result);
        const user = result.user;
        setUser(user); // Set the current user in context
        navigate(from); // Redirect to home page

        // user info in the database
        const userInfo = {
          email: email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        // Send User Data to the back-end
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // Show success alert using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have successfully registered!",
        });
      })
      .catch((error) => {
        // Firebase auth errors to user-friendly messages
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
        toast.error(message); // Show error toast
      });
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-1/2 border focus-within:outline-primary border-gray-300 rounded-md p-2 text-[#111827]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-1/2 border focus-within:outline-primary border-gray-300 rounded-md p-2 text-[#111827]"
            required
          />
        </div>

        {/* Email field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 focus-within:outline-primary rounded-md p-2 text-[#111827]"
          required
        />

        {/* Phone number field */}
        <input
          type="tel"
          name="tel"
          placeholder="Phone Number"
          className="w-full border border-gray-300 focus-within:outline-primary rounded-md p-2 text-[#111827]"
          required
        />

        {/* Password field with show/hide functionality */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            className="w-full border border-gray-300 focus-within:outline-primary rounded-md p-2 text-[#111827]"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Show password error message */}
        <p className="text-red-400 flex items-center gap-2">{showError}</p>

        {/* Terms and conditions agreement */}
        <div className="flex items-start text-sm text-[#111827]">
          <input type="checkbox" name="agreed" required className="mr-2 mt-1" />
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

        {/* Submit button */}
        <button className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:bg-[#1f2937]">
          Create Account
        </button>
      </form>
    </>
  );
};

export default SignUp;
