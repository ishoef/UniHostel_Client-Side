import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const GroupTableRow = ({ meal, buttonShow }) => {
  // This function will be called when the delete button is clicked
  // const handleDelete = () => {
  //   console.log(`Deleting group with ID: ${group._id}`);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Send delete request to the server
  //       fetch(`https://hobby-shop-server.vercel.app/groups/${group._id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log("Delete response:", data);
  //           if (data.deletedCount > 0) {
  //             Swal.fire("Deleted!", "Your group has been deleted.", "success");
  //             // window.location.reload(); // Reload the page to reflect changes

  //             const updatedgroups = groups.filter(
  //               (groupItem) => groupItem._id !== group._id
  //             );
  //             setGroups(updatedgroups);
  //           } else {
  //             Swal.fire("Error!", "Failed to delete the group.", "error");
  //           }
  //         });
  //     }
  //   });
  // };

  return (
    <tr>
      <td>
        <img src={meal.imageUrl} alt={meal.title} className="w-26 h-18 " />
      </td>
      <td>
        <Link to={`/groupDetails/${meal._id}`}>{meal.title}</Link>
      </td>
      <td>{meal.category}</td>
      <td>{meal.likes}</td>
      <td>{meal.reviews_count}</td>
      <td>{meal.rating}</td>
      <td>{meal.distributorName}</td>
      {buttonShow && (
        <td className="space-y-3">
          <Link
            to={`/mygroups/update/${meal._id}`}
            type="button"
            className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
          >
            <IoCreateOutline color="white" />
          </Link>
          <button
            // onClick={() => handleDelete(group._id)}
            type="button"
            className="hover:scale-102 hover:shadow cursor-pointer bg-primary w-fit flex items-center justify-center p-2 rounded"
          >
            <MdDelete color="white" />
          </button>
        </td>
      )}
    </tr>
  );
};

export default GroupTableRow;
