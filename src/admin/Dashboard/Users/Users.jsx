import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(
          `/users?page=${page}&limit=${limit}`
        );
        setUserData(response.data.users);
        setPages(response.data.pages);
      } catch (err) {
        console.log("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure, page]);

  if (loading) {
    return (
      <PreLoader className="flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]" />
    );
  }

  // Style functions
  const getRoleBadgeClass = (role) => {
    return role === "admin"
      ? "bg-orange-100 text-orange-700 font-bold"
      : "bg-blue-100 text-blue-700";
  };

  const getSubscriptionBadgeClass = (plan) => {
    if (plan === "Pro") return "bg-purple-100 text-purple-700";
    if (plan === "Premium") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
          All Users{" "}
          <span className="text-sm text-gray-500">
            ({userData?.length || 0})
          </span>
        </h1>

        <hr className="border border-gray-300" />

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
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
            <tbody className="divide-y divide-gray-100 bg-white">
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
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-gray-400">
                          United States
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-blue-600">
                    <Link to={`mailto:${user.email}`}>{user.email}</Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(user.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {new Date(user.last_login).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
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
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-orange-100"
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
                  : "bg-white hover:bg-orange-100"
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
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-orange-100"
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
