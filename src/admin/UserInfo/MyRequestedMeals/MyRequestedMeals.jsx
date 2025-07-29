import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
import NormalLoader from "../../../Components/Loader copy/NormalLoader";

const MyRequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch meal requests with useQuery
  const {
    data: requests = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myMealRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/user-meal-requests", {
        params: { email: user.email },
      });
      return res.data.data;
    },
  });

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

        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        refetch(); // 🔄 Refetch after cancel
      } catch (err) {
        console.error("Failed to cancel request:", err);
        Swal.fire("Error", "Failed to cancel the request.", "error");
      }
    }
  };

  if (isLoading) return <NormalLoader />;
  if (isError)
    return (
      <p className="text-red-500">
        Error: {error?.message || "Failed to load."}
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
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
              <td colSpan="6" className="text-gray-500 p-4">
                You haven't requested any meals yet.
              </td>
            </tr>
          ) : (
            requests.map((req, idx) => (
              <tr key={req._id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{req.mealName || "N/A"}</td>
                <td className="border p-2">{req.likes || 0}</td>
                <td className="border p-2">{req.rating || 0}</td>
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
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
