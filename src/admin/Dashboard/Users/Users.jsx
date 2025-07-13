import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import axios from "axios";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("the error fetching the users", error);
        setUserData([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  console.log(userData);
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
                  <th>Action</th>
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
                              src={user.photoURL}
                              alt="Avatar Tailwind CSS Component"
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
                      <span className="bg-amber-500 px-2 pb-1 rounded  text-xl ">
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button className="btn text-green-600">Make Admin</button>
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
      </div>
    </div>
  );
};

export default Users;
