import React, { useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import Modal from "../../../Components/Modal/Modal";
import AddUpcommingMeal from "../../../Components/AllForms/AddUpcommingMeal/AddUpcommingMeal";

const UpcommingMeals = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl sm:text-3xl font-extrabold my-5 text-gray-800">
          UpComming{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals
          </span>
        </h2>
        <button
          onClick={() => setShowModel(true)}
          className="btn bg-transparent border border-primary text-primary text-[16px]"
        >
          <RiApps2AddFill />
          Add Upcomming Meals
        </button>
      </div>

      <div></div>

      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <AddUpcommingMeal />
        </Modal>
      )}
    </>
  );
};

export default UpcommingMeals;
