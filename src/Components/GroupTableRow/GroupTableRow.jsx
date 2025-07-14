import React, { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Modal from "../Modal/Modal";
import AddMealForm from "../AllForms/AddMeal/AddMeal";
import UpdateMeals from "../Updates/UpdateMeals/UpdateMeals";

const GroupTableRow = ({ meal, meals, setMeals, buttonShow }) => {
  // This function will be called when the delete button is clicked
  const axiosSecure = useAxiosSecure();

    const [showModal, setShowModal] = useState(false);


  // Handle Delete
  const handleDelete = () => {
    console.log(`Deleting meal with ID: ${meal._id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this meal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/meals/${meal._id}`)
          .then((res) => {
            console.log("delete response:", res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The meal has been deleted.", "success");
              const updatedMeals = meals.filter(
                (item) => item._id !== meal._id
              );
              console.log(updatedMeals);
              setMeals(updatedMeals);
            } else {
              Swal.fire("Error!", "Failed to delete the meal.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting meal:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <>
      <tr>
        <td>
          <img src={meal.imageUrl} alt={meal.title} className="w-26 h-18 " />
        </td>
        <td>
          <Link to={`/groupDetails/${meal._id}`}>{meal.title}</Link>
        </td>
        <td>{meal.category}</td>
        <td>{meal.likes.length || 0}</td>
        <td>{meal.reviews_count}</td>
        <td>{meal.rating}</td>
        <td>{meal.distributorName}</td>
        {buttonShow && (
          <td className="space-y-3">
            <Link
              onClick={() => setShowModal(true)}
              type="button"
              className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
            >
              <IoCreateOutline color="white" />
            </Link>
            <button
              onClick={() => handleDelete(meal._id)}
              type="button"
              className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
            >
              <MdDelete color="white" />
            </button>
          </td>
        )}
      </tr>

      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <UpdateMeals
            setShowModal={setShowModal}
            setMeals={setMeals}
            meal={meal}
          ></UpdateMeals>
        </Modal>
      )}
    </>
  );
};

export default GroupTableRow;
