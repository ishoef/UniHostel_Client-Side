import { useEffect, useState } from "react";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth.jsx/useAuth";

const MyRequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get user email
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/meal-requests");
        const myRequests = res.data.data.filter(
          (req) => req.email === user.email
        );
        setRequests(myRequests);
      } catch (err) {
        console.error("Failed to fetch meal requests:", err);
        setError("Failed to load meal requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure, user?.email]);

  console.log(requests);

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/meal-requests/${id}`, {
        status: "cancelled",
      });

      // Remove cancelled request from table
      setRequests((prev) => prev.filter((req) => req._id !== id));

      // ✅ Optionally: trigger button enable on details page (set flag in localStorage or Context)
      // localStorage.setItem(`mealRequestCancelled-${mealId}`, true);
    } catch (err) {
      console.error("Failed to cancel request:", err);
    }
  };

  if (loading) return <NormalLoader />;
  if (error) return <p className="text-red-500">{error}</p>;
    
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Requested Meals</h2>
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
