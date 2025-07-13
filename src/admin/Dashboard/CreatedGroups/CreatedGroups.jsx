import React, { useEffect } from "react";
import GroupTableRow from "../../../Components/GroupTableRow/GroupTableRow";

const CreatedGroups = ({ meals, setMeals, buttonShow }) => {
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  return (
    <div className="mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center my-5 text-gray-800">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Meals
        </span>
      </h2>
      <div className="overflow-x-auto min-h-[calc(100vh-438px)]">
        <table className="table table-lg border border-[#FF6B3580] dark:border-primary/20 rounded-2xl">
          <thead>
            <tr className="bg-primary dark:bg-gray-800 text-white text-[18px]">
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Rating</th>
              <th>Distributor</th>
              {buttonShow && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <GroupTableRow
                setMeals={setMeals}
                buttonShow={buttonShow}
                meals={meals}
                key={meal._id}
                meal={meal}
              ></GroupTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatedGroups;
