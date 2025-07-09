import React from "react";

export default function SignUp() {
  return (
    <form className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="First Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-[#111827]"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-1/2 border border-gray-300 rounded-md p-2 text-[#111827]"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
      />

      <input
        type="password"
        placeholder="Create a strong password"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827]"
      />

      <select className="w-full border border-gray-300 rounded-md p-2 text-[#111827]">
        <option>Customer</option>
        <option>Driver</option>
        <option>Merchant</option>
      </select>

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

      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:bg-[#1f2937]">
        Create Account
      </button>
    </form>
  );
}
