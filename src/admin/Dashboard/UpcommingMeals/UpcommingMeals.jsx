import React, { useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import Modal from "../../../Components/Modal/Modal";
import AddUpcommingMeal from "../../../Components/AllForms/AddUpcommingMeal/AddUpcommingMeal";
import useUpcommingMeals from "../../../Hooks/useUpcommingMeals/useUpcommingMeals";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import UpcommingMealsTable from "../../../Components/UpcommingMealsTable/UpcommingMealsTable";

const UpcommingMeals = () => {
  const [showModel, setShowModel] = useState(false);
  const { upcommingMeals, setUpcommingMeals } = useUpcommingMeals();
  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl sm:text-3xl font-extrabold my-5 text-gray-800">
          UpComming{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals ({upcommingMeals.length})
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
      {upcommingMeals ? (
        <UpcommingMealsTable
          upcommingMeals={upcommingMeals}
          setUpcommingMeals={setUpcommingMeals}
          buttonShow={true}
        />
      ) : (
        <NoCreatedGroups />
      )}

      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <AddUpcommingMeal setUpcommingMeals={setUpcommingMeals} />
        </Modal>
      )}
    </>
  );
};

export default UpcommingMeals;
