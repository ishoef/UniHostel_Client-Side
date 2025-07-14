import React, { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Modal from "../Modal/Modal";
import UpdateUpcommingMeals from "../Updates/UpdateUpcommingMeals/UpdateUpcommingMeals";

const UpcommingMealsTableRow = ({
  upcommingMeal,
  upcommingMeals,
  setUpcommingMeals,
  buttonShow,
}) => {
  // This function will be called when the delete button is clicked
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);

  // Handle Delete
  const handleDelete = () => {
    console.log(`Deleting upcommingMeal with ID: ${upcommingMeal._id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this upcommingMeal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/upcomming-meals/${upcommingMeal._id}`)
          .then((res) => {
            console.log("delete response:", res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The meal has been deleted.", "success");
              const updatedMeals = upcommingMeals.filter(
                (item) => item._id !== upcommingMeal._id
              );
              console.log(updatedMeals);
              setUpcommingMeals(updatedMeals);
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

  const handlePublish = (id) => {
    console.log(`Publish upcommingMeal with ID: ${id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Publish this upcommingMeal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish it!",
    });
  };

  return (
    <>
      <tr>
        <td>
          <img
            src={upcommingMeal.imageUrl}
            alt={upcommingMeal.title}
            className="w-26 h-18 "
          />
        </td>
        <td>
          <Link to={`/groupDetails/${upcommingMeal._id}`}>
            {upcommingMeal.title}
          </Link>
        </td>
        <td>{upcommingMeal.category}</td>
        <td>{upcommingMeal.likes}</td>
        <td>{upcommingMeal.reviews_count}</td>
        <td>{upcommingMeal.rating}</td>
        <td>{upcommingMeal.distributorName}</td>
        {buttonShow && (
          <td className="space-y-3 ">
            <Link
              onClick={() => setShowModal(true)}
              type="button"
              className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
            >
              <IoCreateOutline color="white" />
            </Link>
            <button
              onClick={() => handleDelete(upcommingMeal._id)}
              type="button"
              className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
            >
              <MdDelete color="white" />
            </button>
          </td>
        )}
        <td>
          <button
            onClick={() => handlePublish(upcommingMeal._id)}
            className="btn hover:scale-102 transition-all duration-300 hover:bg-primary hover:text-white ease-in-out text-green-600"
          >
            Publish Now
          </button>
        </td>
      </tr>

      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <UpdateUpcommingMeals
            setShowModal={setShowModal}
            setUpcommingMeals={setUpcommingMeals}
            upcommingMeal={upcommingMeal}
          ></UpdateUpcommingMeals>
        </Modal>
      )}
    </>
  );
};

export default UpcommingMealsTableRow;
