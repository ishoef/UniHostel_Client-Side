import React, { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const UpdateUserInfo = () => {
  const { user, updateUser, setUser } = use(AuthContext);

  const [updateName, setUpdateName] = useState(user?.displayName || "");
  const [photoURL, setPhotoUrl] = useState(user?.photoURL || "");

  const handleUpdate = async () => {
    try {
      await updateUser({
        displayName: updateName,
        photoURL: photoURL,
      });

      setUser({ ...user, displayName: updateName, photoURL: photoURL });
      toast.success("profile updated successfully");
    } catch (error) {
      toast.error("failed to update profile" + error.message);
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="border py-10 lg:py-10 px-3 md:p-8 lg:p-10 rounded-2xl border-white lg:w-11/12 mx-auto mt-5">
        <h1 className="text-2xl font-semibold text-white">Update User Info</h1>
        {/* Name */}
        <div className="flex flex-col gap-4 mt-5">
          <label
            className="text-start text-white text-xl font-semibold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="text-white focus:outline-primary border border-gray-400 rounded placeholder-white py-2 px-3"
            placeholder="Enter Your Name"
            type="text"
            name="name"
            onChange={(e) => setUpdateName(e.target.value)}
            required
          />
        </div>

        {/* PhotoUrl */}
        <div className="flex flex-col gap-4">
          <label
            className="mt-5 text-white text-xl text-start font-semibold"
            htmlFor="photoUrl"
          >
            Photo URL
          </label>
          <input
            className="text-white focus:outline-primary border placeholder-white border-gray-400 rounded py-2 px-3"
            placeholder="Photo URL"
            type="text"
            name="photoUrl"
            onChange={(e) => setPhotoUrl(e.target.value)}
            required
          />
        </div>

        <button onClick={handleUpdate} className="btn mt-5 lg:w-70 text-[16px]">
          Save Changes
        </button>
      </div>
    </>
  );
};

export default UpdateUserInfo;
