import React, { useEffect } from "react";
import UpcommingMealsTableRow from "../UpcommingMealsTableRow/UpcommingMealsTableRow";

const UpcommingMealsTable = ({
  upcommingMeals,
  setUpcommingMeals,
  buttonShow,
}) => {
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  return (
    <div className="mx-auto">
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
              <th>Publish</th>
            </tr>
          </thead>
          <tbody>
            {upcommingMeals.map((upcommingMeal) => (
              <UpcommingMealsTableRow
                setUpcommingMeals={setUpcommingMeals}
                buttonShow={buttonShow}
                upcommingMeals={upcommingMeals}
                upcommingMeal={upcommingMeal}
                key={upcommingMeal._id}
              ></UpcommingMealsTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcommingMealsTable;
