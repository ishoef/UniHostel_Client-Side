import React, { use } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const SignUp = () => {
  const { createUser, setUser } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i am clicked");

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const tel = e.target.tel.value;
    const password = e.target.password.value;

    console.log(firstName, lastName, email, tel, password);

    createUser(email, password)
      .then((result) => {
        console.log("after create user", result);
        setUser(result.user);
      })
      .catch((error) => {
        alert(error);
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
