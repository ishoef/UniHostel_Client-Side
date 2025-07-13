import React, { use } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const ProfileInformation = ({
  isEditing,
  setUpdateName,
  // setUserEmail,
  setPhotoURL,
  // setBio,
}) => {
  const { user } = use(AuthContext);

  console.log(user);
  console.log(user.displayName);
  return (
    <form className="grid md:grid-cols-2 gap-5 poppins">
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="input w-full focus-within:outline-none focus-within:border-primary"
          defaultValue={user?.displayName}
          disabled={!isEditing}
          onChange={(e) => setUpdateName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          Email{" "}
          <span className="text-xs text-gray-400">(Changes not allowed)</span>{" "}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input w-full focus-within:outline-none focus-within:border-primary"
          defaultValue={user?.email}
          disabled
          // onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="bio">
          Bio{" "}
          <span className="text-xs text-gray-400">(Changes not allowed)</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          className="textarea w-full focus-within:outline-none focus-within:border-primary"
          rows="4"
          value={
            "Passionate about learning and sharing knowledge. I enjoy exploring new technologies, solving real-world problems, and connecting with like-minded people. Always open to new opportunities and ideas."
          }
          disabled
          // onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>

      {/* Photo URL */}
      <div className="flex flex-col gap-2 w-full md:col-span-2">
        <label htmlFor="photoURL">Photo URL</label>
        <input
          id="fullName"
          name="photoURL"
          type="url"
          className="input w-full focus-within:outline-none focus-within:border-primary"
          defaultValue={user?.photoURL}
          disabled={!isEditing}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </div>
    </form>
  );
};

export default ProfileInformation;
