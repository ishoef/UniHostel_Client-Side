import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10; // Or whatever value you want per page

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";

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
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  return (
    <div className="mb-10">
      <div className="space-y-5 ">
        <h1 className="text-3xl font-semibold text-primary">
          All Users ({userData?.length || 0})
        </h1>
        <hr className="border border-gray-300 dark:border-primary/10 " />
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>

                  <th>Join Date</th>
                  <th>Last Sign in</th>
                  <th>Role</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {userData.map((user) => (
                  <tr key={user.uid}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                user.photoURL ||
                                "https://images.unsplash.com/photo-1647605243706-f41cf8197f31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRhcmslMjBwcm9maWxlfGVufDB8fDB8fHww"
                              }
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.displayName}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to={`mailto:${user.email}`}>{user.email}</Link>
                    </td>

                    <td>
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                      <br />

                      {new Date(user.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {new Date(user.last_login).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                      <br />

                      {new Date(user.last_login).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      <span className="bg-amber-100 px-2 pb-1 rounded  text-xl ">
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className="bg-amber-100 px-2 pb-1 rounded  text-xl ">
                        {user?.plan || "Free"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              {/* <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
        
        {/* Pagination Buttons */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded border ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-orange-100"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(pages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-3 py-1 rounded border ${
                page === p + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-100"
              }`}
            >
              {p + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            disabled={page === pages}
            className={`px-3 py-1 rounded border ${
              page === pages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
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
