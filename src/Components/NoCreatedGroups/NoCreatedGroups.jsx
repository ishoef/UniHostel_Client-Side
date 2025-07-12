import React, { useEffect } from "react";
import { Link } from "react-router";
import { PiMaskHappyFill } from "react-icons/pi";

const NoCreatedGroups = () => {
    useEffect(() => {
        document.title = "Go to Create Group | Hobby Shop";
      }, []);
  return (
    <div className="">
      <div className="w-11/12 md:w-10/12 mx-auto h-[80vh] flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <PiMaskHappyFill color="#FF6B35" size={100} />
          <h1 className="text-3xl text-center">
            <span className="text-primary font-semibold">Ooops!</span> You
            haven’t created any groups yet!
          </h1>
          <p className="text-center">
            Start building your own hobby community — click “Create Group” to
            get started.
          </p>
          <Link to="/creategroup">
            <button className="btn rounded-3xl text-white bg-primary text-[18px] hover:bg-transparent hover:text-primary">
              Create Group & Chill
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoCreatedGroups;
