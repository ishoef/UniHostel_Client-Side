import { Link } from "react-router";
import { LuFileX2 } from "react-icons/lu";
import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    document.title = "App Godaun | Error";
  }, []);

  return (
    <div className="">
      <div className="w-[80%] mx-auto h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <LuFileX2 color="red" size={100} />
          <h1 className="text-3xl text-center">
            <span className="text-red-600 font-semibold">Ooops!</span> The page
            you are looking for doesn't exist
          </h1>
          <p className="text-center">
            it seems like the page you are trying to access is either removed or
            never existed
          </p>
          <Link to="./">
            <button className="btn rounded-3xl text-white bg-primary text-[18px] hover:bg-transparent hover:text-primary">
              Chill With Our Apps
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
