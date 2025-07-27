import React, { useEffect, useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import GroupTableRow from "../../../Components/GroupTableRow/GroupTableRow";
import Modal from "../../../Components/Modal/Modal";
import AddMealForm from "../../../Components/AllForms/AddMeal/AddMeal";

const CreatedGroups = ({ meals, setMeals, buttonShow, totalMeals }) => {
  const [showModel, setShowModel] = useState();
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  console.log(meals);

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl sm:text-3xl font-extrabold my-5 text-gray-800">
          All{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals ({totalMeals})
          </span>
        </h2>
        <button
          onClick={() => setShowModel(true)}
          className="btn bg-transparent border border-primary text-primary text-[16px]"
        >
          <RiApps2AddFill />
          Add Meals
        </button>
      </div>
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
      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <AddMealForm setMeals={setMeals} />
        </Modal>
      )}
    </div>
  );
};

export default CreatedGroups;
