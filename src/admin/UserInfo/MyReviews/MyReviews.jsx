import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth.jsx/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Modal from "../../../Components/Modal/Modal";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // assumes user contains email
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // you can make it selectable if needed
  const [totalPages, setTotalPages] = useState(1);

  console.log(user);
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyReviews = async () => {
      try {
        const res = await axiosSecure.get(
          `/user/my-reviews/${user.email}?page=${currentPage}&limit=${limit}`
        );
        setReviews(res.data.reviews);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching user reviews:", err);
      } finally {
        setLoading(false);
      }
    };


    fetchMyReviews();
  }, [user?.email, axiosSecure, currentPage, limit]);

  console.log(reviews);

  const handleDelete = async (mealId, index) => {
    const confirm = await Swal.fire({
      title: "Delete this review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/user/reviews/${mealId}/${index}`);
      setReviews((prev) =>
        prev.filter((r) => !(r.mealId === mealId && r.index === index))
      );

      Swal.fire("Deleted!", "Your review has been deleted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete the review.", "error");
    }
  };

  // Update the review
  const handleUpdateReview = async () => {
    try {
      const res = await axiosSecure.put(
        `/user/reviews/${selectedReview.mealId}/${selectedReview.index}`,
        {
          rating: newRating,
          comment: newComment,
        }
      );

      if (res.data.success) {
        setReviews((prev) =>
          prev.map((r) =>
            r.mealId === selectedReview.mealId &&
            r.index === selectedReview.index
              ? { ...r, rating: newRating, comment: newComment }
              : r
          )
        );
        Swal.fire("Success!", "Your review has been updated.", "success");
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Reviews</h2>

      <div className="overflow-x-auto rounded shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-orange-100 text-gray-700 text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Meal</th>
              <th className="px-5 py-3 font-semibold">Likes</th>
              <th className="px-5 py-3 font-semibold">Rating</th>
              <th className="px-5 py-3 font-semibold">Review</th>
              <th className="px-5 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((r, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-5 py-3 font-medium hover:underline hover:text-blue-600">
                  <Link to={`/meal_details/${r.mealId}`}>
                    {r.mealName || "N/A"}
                  </Link>
                </td>
                <td className="px-5 py-3">{r.likes?.length || 0}</td>
                <td className="px-5 py-3 text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < r.rating ? (
                        "★"
                      ) : (
                        <span className="text-gray-300">★</span>
                      )}
                    </span>
                  ))}
                </td>
                <td className="px-5 py-3">{r.comment}</td>
                <td className="px-5 py-3 flex items-center gap-2 justify-center">
                  <Link
                    to={`/meal_details/${r.mealId}`}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                  >
                    View Meal
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedReview(r);
                      setNewRating(r.rating);
                      setNewComment(r.comment);
                      setShowModal(true);
                    }}
                    className="text-xs cursor-pointer bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r.mealId, r.index)}
                    className="text-xs bg-red-100 text-red-600 cursor-pointer px-3 py-1 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-5 py-6 text-gray-500 italic"
                >
                  No reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1
                ? "bg-orange-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Write a Review</label>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setNewRating(num)}
                  className={`text-2xl cursor-pointer ${
                    newRating >= num ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 focus:outline-primary rounded p-2 mb-2"
              rows="3"
              placeholder="Share your thoughts about this meal..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateReview}
                className="px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-transform duration-150"
              >
                Submit Review
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;
