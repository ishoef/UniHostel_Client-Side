import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md text-center bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
