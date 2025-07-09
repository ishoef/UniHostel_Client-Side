import React, { use, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import UpdateUserInfo from "./UpdateUserInfo";
import { AuthContext } from "../../Context/AuthProvider";

const MyProfile = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
    document.title = "UniHostel | My Profile";
  }, []);

  return (
    <div className="w-11/12 lg:w-6/12 mx-auto bg-primary rounded-2xl p-4 md:p-8 lg:p-20 text-center my-10">
      <div className="border py-10 px-3  rounded-2xl border-white lg:w-11/12 mx-auto">
        <div className="rounded-full border border-green-800 w-[80px] h-[80px] mx-auto">
          {!user ? (
            <CgProfile />
          ) : (
            <img
              className="w-[80px] h-[80px] rounded-full border-2 border-green-600"
              src={user.photoURL}
              alt="photo"
            />
          )}
        </div>
        <h1 className="text-white text-2xl font-bold mt-10">
          {user.displayName}
        </h1>
        <h1 className="text-white lg:text-2xl md:text-2xl font-semibold mt-3">
          {user.email}
        </h1>
      </div>
      <UpdateUserInfo></UpdateUserInfo>
    </div>
  );
};

export default MyProfile;
