import React, { useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import Modal from "../../../Components/Modal/Modal";
import AddUpcommingMeal from "../../../Components/AllForms/AddUpcommingMeal/AddUpcommingMeal";
import useUpcommingMeals from "../../../Hooks/useUpcommingMeals/useUpcommingMeals";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import UpcommingMealsTable from "../../../Components/UpcommingMealsTable/UpcommingMealsTable";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";

const UpcommingMeals = () => {
  const [showModel, setShowModel] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10; // meals per page

  const { upcommingMeals, setUpcommingMeals, total, loading } =
    useUpcommingMeals(page, limit);

  const totalPages = Math.ceil(total / limit);

  if (!loading && upcommingMeals.length === 0) {
    return <NoCreatedGroups />;
  }

  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl sm:text-3xl font-extrabold my-5 text-gray-800">
          UpComming{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals ({total})
          </span>
        </h2>
        <button
          onClick={() => setShowModel(true)}
          className=" btn bg-transparent border border-primary text-primary text-[16px]"
        >
          <RiApps2AddFill />
          Add Upcomming Meals
        </button>
      </div>

      {loading ? (
        <NormalLoader />
      ) : (
        <>
          <UpcommingMealsTable
            upcommingMeals={upcommingMeals}
            setUpcommingMeals={setUpcommingMeals}
            buttonShow={true}
          />

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 text-white"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded ${
                  page === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? " bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "cursor-pointer bg-orange-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for adding meals */}
      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <AddUpcommingMeal setUpcommingMeals={setUpcommingMeals} />
        </Modal>
      )}
    </>
  );
};

export default UpcommingMeals;
