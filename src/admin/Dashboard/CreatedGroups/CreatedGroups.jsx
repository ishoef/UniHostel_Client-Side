import React, { useEffect } from "react";
import GroupTableRow from "../../../Components/GroupTableRow/GroupTableRow";

const CreatedGroups = ({ meals, buttonShow, title }) => {
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl mb-3 font-bold">
        {title} ({meals ? meals.length : 0})
      </h1>
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
