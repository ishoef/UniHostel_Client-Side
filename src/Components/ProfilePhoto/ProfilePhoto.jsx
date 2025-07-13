import React, { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";

const ProfilePhoto = ({ tooltip, proPic, To, className }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { user } = use(AuthContext);

  return (
    <>
      <Link to={To}>
        <div
          className="rounded-full"
          onMouseEnter={() => tooltip && setShowTooltip(true)}
          onMouseLeave={() => tooltip && setShowTooltip(false)}
        >
          <img
            className={
              className ||
              "w-[40px] h-[40px] rounded-full border-2 border-green-600"
            }
            src={`${
              proPic ||
              "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
            }`}
            alt=""
          />
        </div>
      </Link>

      {showTooltip && (
        <div className="absolute right-2 top-16 lg:right-60 lg:top-[70px] bg-primary text-white text-sm px-4 py-5 rounded shadow-md z-[9999]">
          <div className="flex items-center flex-col gap-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-[#14b8a6]"
              src={`${
                proPic ||
                "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
              }`}
              alt=""
            />
            <span className="text-white font-semibold">{user.name}</span>
            <span className="text-white font-semibold">{user.email}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
