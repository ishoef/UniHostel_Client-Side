import React from "react";

const ItemsLoader = ({ title, loderClass }) => {
  const item = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse ">
      <div className="w-full">
        <img
          className="w-full rounded-t-xl bg-gray-300 dark:bg-gray-700 h-50 md:h-50 lg:h-60"
          src=""
        />
      </div>
      <div className="p-4">
        <div className="w-full">
          <div className="w-full">
            <div className="bg-gray-300 dark:bg-gray-700 w-28 h-6 rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 w-28 h-6 rounded mb-2"></div>
          </div>
          <div className="mb-2">
            <div className="bg-gray-300 dark:bg-gray-700 w-full h-6 rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 w-full h-6 rounded mb-2"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-300 dark:bg-gray-700 w-16 h-6 rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 w-16 h-6 rounded mb-2"></div>
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 w-full h-8 rounded mb-2"></div>
      </div>
    </div>
  );
  
  return (
    <>
      <h1 className="title text-center">{title}</h1>
      <div className={loderClass}>
        {/* <div>
            <div className="bg-white rounded-lg shadow-md p-4 animate-pulse ">
              <div className="w-full">
                <img
                  className="w-full rounded-t-xl h-50 md:h-50 lg:h-60"
                  src=""
                />
              </div>
              <div className="w-full gap-4 px-6 py-5">
                <div className="w-full">
                  <h1 className="font-semibold text-primary text-[18px]"></h1>
                  <p className="text-gray-400 mb-2"> </p>
                </div>
                <div className="mb-2">
                  <p className="flex items-center gap-2"></p>
                  <p className="flex items-center gap-2"></p>
                </div>
                <div className="flex justify-between">
                  <p className="flex items-center gap-2"></p>
                  <p className="flex items-center gap-2"></p>
                </div>
              </div>
              <button className="btn btn-primary mx-6 text-[17px] dark:text-gray-200 hover:bg-transparent hover:text-primary transition-all"></button>
            </div>
          </div> */}
        {item} {item} {item} {item} {item} {item} {item} {item}
      </div>
    </>
  );
};

export default ItemsLoader;
