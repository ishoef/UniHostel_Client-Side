import { useEffect, useState } from "react";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
import Swal from "sweetalert2";

const MyRequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get user email
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/user-meal-requests", {
          params: { email: user.email },
        });
        setRequests(res.data.data);
      } catch (err) {
        console.error("Failed to fetch meal requests:", err);
        setError("Failed to load meal requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure, user?.email]);


  const handleCancel = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axiosSecure.patch(`/meal-requests/${id}`, {
          status: "cancelled",
        });

        // ✅ Update the status in state
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "cancelled" } : req
          )
        );

        // ✅ Show success alert
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
      } catch (err) {
        console.error("Failed to cancel request:", err);
        Swal.fire("Error", "Failed to cancel the request.", "error");
      }
    }
  };


  if (loading) return <NormalLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className=" text-3xl sm:text-3xl lg:text-4xl font-bold mb-4">
        My{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Requested Meals <span className="text-xl">({requests.length})</span>
        </span>
      </h2>
      <table className="w-full border-collapse border text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">No.</th>
            <th className="border p-2">Meal Title</th>
            <th className="border p-2">Likes</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-gray-500 p-4">
                You haven't requested any meals yet.
              </td>
            </tr>
          ) : (
            requests.map((req, idx) => (
              <tr key={req._id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{req.mealName || "N/A"}</td>
                <td className="border p-2">{req.likes || 0}</td>
                <td className="border p-2">{req?.rating || 0}</td>
                <td className="border p-2 capitalize">
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
                <td className="border p-2">
                  <button
                    onClick={() => handleCancel(req._id)}
                    disabled={req.status !== "pending"}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed: "
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
  );
};

export default MyRequestedMeals;
