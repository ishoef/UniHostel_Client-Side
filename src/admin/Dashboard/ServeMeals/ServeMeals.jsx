import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";
import { useQuery } from "@tanstack/react-query";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ Fetch paginated meal requests using TanStack Query
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["meal-requests", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meal-requests?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const updateStatus = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/meal-requests/${id}`, { status: newStatus });
      refetch(); // 🔄 Refresh the data after update
    } catch (err) {
      console.error(`Failed to update status to ${newStatus}:`, err);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleString() : "N/A";

  const sortedRequests = data?.data?.sort(
    (a, b) => new Date(b.requestTime) - new Date(a.requestTime)
  );

  if (isLoading || isFetching) return <NormalLoader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500">
        Meal Serve Requests <span>({data?.pagination?.total || 0})</span>
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Request Time</th>
              <th className="px-6 py-3">Serve Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedRequests?.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-6 text-gray-400 font-medium"
                >
                  No meal requests found.
                </td>
              </tr>
            ) : (
              sortedRequests?.map((req, ind) => (
                <tr
                  key={req._id}
                  className="hover:bg-orange-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium">{ind + 1}</td>
                  <td className="px-6 py-4 font-medium">{req.mealName}</td>
                  <td className="px-6 py-4 text-blue-600">{req.email}</td>
                  <td className="px-6 py-4">{req.name}</td>
                  <td className="px-6 py-4">{formatDate(req.requestTime)}</td>
                  <td className="px-6 py-4">{formatDate(req.approvedAt)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 space-y-2">
                    <button
                      onClick={() => updateStatus(req._id, "delivered")}
                      disabled={req.status !== "pending"}
                      className="cursor-pointer disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                    >
                      Serve
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "cancelled")}
                      disabled={req.status !== "pending"}
                      className="cursor-pointer disabled:cursor-not-allowed bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {data?.pagination?.totalPages || 1}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, data?.pagination?.totalPages || 1)
            )
          }
          disabled={page === data?.pagination?.totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServeMeals;
