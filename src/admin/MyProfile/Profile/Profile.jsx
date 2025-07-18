import React, { use, useState } from "react";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { AuthContext } from "../../../Context/AuthProvider";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import { RxCross2 } from "react-icons/rx";
import ProfilePhoto from "../../../Components/ProfilePhoto/ProfilePhoto";
import useUserRole from "../../../Hooks/UseUserRole/UseUserRole";
import useUserByEmail from "../../../Hooks/useUserByEmail/useUserByEmail";

const Profile = () => {
  const { user, updateUser, setUser } = use(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updateName, setUpdateName] = useState(user?.displayName || "");
  // const [userEmail, setUserEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [bio, setBio] = useState(user?.bio || "");

  const { data: currentUser } = useUserByEmail(user?.email);
  console.log(currentUser);
  console.log(currentUser?.plan);

  const date = new Date(user.metadata.creationTime);
  const formatted = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // const btnsInfo = [
  //   {
  //     btnText: (
  //       <div className="flex items-center gap-2 text-[16px]">
  //         <p>
  //           <SiJquery />
  //         </p>
  //         <p>My Queries</p>
  //       </div>
  //     ),
  //     link: "/myqueries",
  //     className:
  //       "bg-transparent border border-gray-400 btn rounded hover:bg-primary hover:text-white",
  //   },

  //   {
  //     btnText: (
  //       <div className="flex items-center gap-2 text-[16px]">
  //         <p>
  //           <FaRegCommentAlt />
  //         </p>
  //         <p>My Recommendations</p>
  //       </div>
  //     ),

  //     link: "/myrecos",
  //     className:
  //       "bg-transparent border border-gray-400 btn rounded hover:bg-primary hover:text-white",
  //   },

  //   {
  //     btnText: (
  //       <div className="flex items-center gap-2 text-[16px]">
  //         <p>
  //           <IoCreateOutline />
  //         </p>
  //         <p>Add New Query</p>
  //       </div>
  //     ),

  //     link: "/addquery",
  //     className:
  //       "bg-primary text-white border border-gray-400 btn rounded hover:bg-transparent hover:text-black",
  //   },
  // ];

  const handleUpdate = async () => {
    if (!updateName.trim() && !photoURL.trim()) {
      alert("Please fill at least one field");
      return;
    }

    try {
      await updateUser({
        displayName: updateName,
        photoURL: photoURL,
        bio: bio,
      });

      setUser({
        ...user,
        displayName: updateName,
        photoURL: photoURL,
        bio: bio,
      });
      alert("Profile Updated successfully");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile" + error.message);
      console.log(error.message);
    }
  };

  const { role } = useUserRole();

  return (
    <>
      <div className="p-3 md:p-5 w-full h-full flex flex-col gap-6 justify-center items-center border border-gray-300 rounded-xl shadow">
        {/* Profile Informations */}
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 text-2xl poppins-semibold">
            <LuUser />
            <h1 className="hidden md:block">
              Profile Information{" "}
              {role === "admin" && (
                <span className="text-green-600 font-bold">(Admin)</span>
              )}{" "}
              {/* {currentUser?.isSubscribed && <p>{currentUser?.plan}</p>} */}
            </h1>
          </div>

          <div className="space-x-2 md:space-x-5">
            {/* Cancel Button */}
            <button
              onClick={() => setIsEditing(false)}
              className={`text-[18px] bg-transparent border border-gray-400 btn rounded-md hover:bg-red-500 hover:text-white hover:border-none transition-opacity duration-500 ease-in-out ${
                isEditing
                  ? "opacity-100 visible inline-block"
                  : "opacity-0 invisible hidden"
              } `}
              // style={{ display: isEditing ? "inline-block" : "none" }}
            >
              <p className="flex items-center gap-2">
                <RxCross2 /> <span className="hidden md:block">Cancel</span>
              </p>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className={`text-[18px] bg-transparent border border-gray-400 btn rounded-md hover:bg-primary hover:text-white transition-all duration-500 ease-in-out ${
                isEditing
                  ? "opacity-0 invisible hidden"
                  : "opacity-100 visible inline-block"
              }`}
            >
              <p className="flex items-center gap-2">
                <FaRegEdit /> Edit Profile
              </p>
            </button>

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              className={`text-[18px] bg-primary text-white border border-gray-400 btn rounded-md hover:bg-accent hover:text-white transition-opacity duration-500 ease-in-out ${
                isEditing
                  ? "opacity-100 visible inline-block"
                  : "hidden opacity-0 invisible "
              }`}
              // style={{ display: isEditing ? "inline-block" : "none" }}
            >
              <p className="flex items-center gap-2">
                <FaRegSave />
                Save
              </p>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-6 my-2 md:my-0 gap-10 w-full">
          <div className=" lg:col-span-2 gap-2 flex flex-col items-center">
            <ProfilePhoto
              proPic={user?.photoURL}
              className={"w-48 h-48 rounded-full border-2 border-green-600"}
            />
            <h1 className="text-2xl font-semibold poppins text-center">
              {user.displayName}
            </h1>
            <p className="poppins">Joined Since {formatted}</p>
            <p className="poppins">At {formattedTime}</p>
          </div>
          <div className="lg:col-span-4 ">
            <ProfileInformation
              setUpdateName={setUpdateName}
              setPhotoURL={setPhotoURL}
              setBio={setBio}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      {/* <div className="w-full h-full flex justify-center items-center border border-gray-300 rounded-xl shadow">
        Cards
      </div> */}

      {/* Quic Actions */}
      {/* <div className="w-full h-full p-3 md:p-5 border border-gray-300 rounded-xl shadow">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <p className="text-2xl">
              <GrAction />
            </p>
            <h1 className="text-2xl poppins font-semibold">Quick Actions</h1>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {btnsInfo.map((btn, index) => (
              <Button
                key={index}
                to={btn.link}
                text={btn.btnText}
                className={btn.className}
              />
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Profile;
