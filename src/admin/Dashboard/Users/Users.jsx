import React, { useState } from "react";
import { Link } from "react-router";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async ({ queryKey }) => {
    const [_key, page, limit] = queryKey;
    const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <PreLoader className="flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]" />
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  const userData = data?.users || [];
  const pages = data?.pages || 1;

  const getRoleBadgeClass = (role) =>
    role === "admin"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100 font-bold"
      : "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";

  const getSubscriptionBadgeClass = (plan) => {
    if (plan === "Pro")
      return "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100";
    if (plan === "Premium")
      return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
    return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 dark:text-orange-400">
          All Users{" "}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({userData.length})
          </span>
        </h1>

        <hr className="border border-gray-300 dark:border-gray-600" />

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Join Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Last Sign In
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Subscription
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900 dark:divide-gray-700">
              {userData.map((user) => (
                <tr key={user.uid}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              user.photoURL ||
                              "https://images.unsplash.com/photo-1647605243706-f41cf8197f31?w=500&auto=format&fit=crop&q=60"
                            }
                            alt="User"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium dark:text-gray-200">
                          {user.displayName}
                        </div>
                        <div className="text-sm text-gray-400 dark:text-gray-400">
                          United States
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-blue-600 dark:text-blue-400">
                    <Link to={`mailto:${user.email}`}>{user.email}</Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(user.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(user.last_login).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(user.last_login).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block text-sm px-3 py-1 rounded-full ${getRoleBadgeClass(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block text-sm px-3 py-1 rounded-full ${getSubscriptionBadgeClass(
                        user.plan
                      )}`}
                    >
                      {user?.plan || "Free"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 text-sm rounded-md font-medium border ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                : "bg-white hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-orange-600"
            }`}
          >
            Previous
          </button>

          {[...Array(pages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-4 py-2 text-sm rounded-md font-medium border ${
                page === p + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-orange-600 dark:text-gray-200"
              }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            disabled={page === pages}
            className={`px-4 py-2 text-sm rounded-md font-medium border ${
              page === pages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                : "bg-white hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
