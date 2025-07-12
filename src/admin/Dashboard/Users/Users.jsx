import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PreLoader from "../../../Components/Loader/PreLoader/PreLoader";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";

  useEffect(() => {
    fetch("https://hobby-shop-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
        console.log(data);
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
                      <br />
                      {/* <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span> */}
                    </td>
                    <td>
                      {new Date(user.joinTime).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                      <br />

                      {new Date(user.joinTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {new Date(user.lastSignInTime).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                      <br />

                      {new Date(user.lastSignInTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
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
