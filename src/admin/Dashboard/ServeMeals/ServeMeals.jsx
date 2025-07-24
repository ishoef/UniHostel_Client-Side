import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";

const ServeMeals = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // or let the user choose
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/meal-requests?page=${page}&limit=${limit}`
        );
        setRequests(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        setError("Failed to load meal requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure, page, limit]);

  const updateStatus = (id, newStatus) => {
    axiosSecure
      .patch(`/meal-requests/${id}`, { status: newStatus })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      })
      .catch((err) => {
        console.error(`Failed to update status to ${newStatus}:`, err);
      });
  };

  console.log(requests);

  if (loading) {
    return <NormalLoader />;
  }

  if (error) {
    return <p>{`We Have a some Error for fetching data ${error}`}</p>;
  }

  // Formate Date
  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleString() : "N/A";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Meal Serve Requests</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">Request Time</th>
            <th className="border p-2">Serve Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No meal requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="border p-2">{req.mealName || "N/A"}</td>
                <td className="border p-2">{req.email}</td>
                <td className="border p-2">{req.name}</td>
                <td className="border p-2">{formatDate(req.requestTime)}</td>
                <td className="border p-2">{formatDate(req.approvedAt)}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      req.status === "pending"
                        ? "bg-yellow-300"
                        : req.status === "delivered"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(req._id, "delivered")}
                    disabled={req.status !== "pending"}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Serve
                  </button>
                  <button
                    onClick={() => updateStatus(req._id, "cancelled")}
                    disabled={req.status !== "pending"}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Pagination buttons */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServeMeals;
