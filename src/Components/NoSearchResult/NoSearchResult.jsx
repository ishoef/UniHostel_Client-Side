import React from "react";

const NoSearchResult = ({ searchText }) => {
  return (
    <div className="text-center my-16 px-5">
      <h2 className="text-2xl font-semibold text-gray-700">
        No results found for:
      </h2>
      <p className="mt-2 text-orange-500 font-medium text-lg">"{searchText}"</p>
      <p className="mt-4 text-gray-500">
        Try searching with a different keyword or check your spelling.
      </p>
    </div>
  );
};

export default NoSearchResult;
