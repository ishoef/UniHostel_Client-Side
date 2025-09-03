import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const AllReviewsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reviews", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/reviews?page=${currentPage}&limit=${reviewsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const reviews = data?.reviews || [];
  const totalReviews = data?.total || 0;

  const handleDeleteReview = async (
    mealId,
    index,
    comment,
    name,
    rating,
    mealName
  ) => {
    const confirm = await Swal.fire({
      title: "Delete This Review?",
      html: `
        <div style="text-align:left; font-size:14px; line-height:1.6; padding: 0 4px;">
          <p><strong style="color:#e76f51;">🍽️ Meal:</strong> <span style="font-weight:600;">${mealName}</span></p>
          <p><strong style="color:#264653;">👤 Reviewer:</strong> ${name}</p>
          <p><strong style="color:#f4a261;">⭐ Rating:</strong>
            <span style="color:#facc15; font-size:16px;">${"★".repeat(
              rating
            )}</span>
            <span style="color:#d1d5db; font-size:16px;">${"★".repeat(
              5 - rating
            )}</span>
          </p>
          <p><strong style="color:#2a9d8f;">💬 Comment:</strong><br>
            <span style="display:inline-block; margin-top:4px; background:#f9fafb; padding:8px 10px; border-radius:6px; border:1px solid #e5e7eb;">
              ${comment}
            </span>
          </p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl",
        title: "text-lg font-semibold",
        confirmButton: "px-5 py-2",
        cancelButton: "px-5 py-2",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/admin/reviews/${mealId}/${index}`);
      Swal.fire({
        title: "Deleted!",
        text: "The review has been removed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: true,
      });
      refetch();
    } catch (err) {
      console.error("Failed to delete review", err);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the review. Try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold my-4 dark:text-white">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Meals Review <span className="text-xl">({reviews.length})</span>
        </span>
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading reviews...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500 dark:text-red-400">
          Failed to load reviews.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-700">
            <table className="min-w-full text-sm text-gray-800 dark:text-gray-300">
              <thead className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold">Meal</th>
                  <th className="px-5 py-3 font-semibold">Reviewer</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Rating</th>
                  <th className="px-5 py-3 font-semibold">Comment</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reviews.map((r, idx) => (
                  <tr
                    key={`${r.mealId}-${r.index}`}
                    className={
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 hover:bg-orange-50 transition-all dark:bg-gray-900 dark:hover:bg-gray-700"
                    }
                  >
                    <td className="px-5 py-3 font-medium hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                      <Link to={`/meal_details/${r.mealId}`}>
                        {r.mealName || "N/A"}
                      </Link>
                    </td>
                    <td className="px-5 py-3">{r.name || "Unknown"}</td>
                    <td className="px-5 py-3">
                      {r.email ? (
                        <a
                          href={`mailto:${r.email}`}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {r.email}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="text-center">{r.rating}</td>
                    <td className="px-5 py-3">{r.comment}</td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                      {new Date(r.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() =>
                          handleDeleteReview(
                            r.mealId,
                            r.index,
                            r.comment,
                            r.name,
                            r.rating,
                            r.mealName || "N/A"
                          )
                        }
                        className="bg-red-100 dark:bg-red-800 cursor-pointer text-red-600 dark:text-red-300 px-3 py-1.5 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-all text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {reviews.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-5 py-6 text-gray-500 dark:text-gray-400 italic"
                    >
                      No reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center mt-6 gap-1 text-gray-500 dark:text-gray-400">
            <IoMdInformationCircleOutline />
            Click on the Meal Name for Meal Details
          </div>

          {totalReviews > reviewsPerPage && (
            <div className="flex justify-center items-center mt-6 gap-1 text-sm font-medium">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                « First
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                ‹ Prev
              </button>

              <span className="px-3 text-gray-700 dark:text-gray-300">
                Page <span className="font-bold">{currentPage}</span> of{" "}
                <span className="font-bold">
                  {Math.ceil(totalReviews / reviewsPerPage)}
                </span>
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(totalReviews / reviewsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage >= Math.ceil(totalReviews / reviewsPerPage)
                }
                className="cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                Next ›
              </button>

              <button
                onClick={() =>
                  setCurrentPage(Math.ceil(totalReviews / reviewsPerPage))
                }
                disabled={
                  currentPage >= Math.ceil(totalReviews / reviewsPerPage)
                }
                className="cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                Last »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllReviewsTable;
