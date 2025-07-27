import { useMemo, useState } from "react";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import CreatedGroups from "../CreatedGroups/CreatedGroups";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import useMeals from "../../../Hooks/useMeals/useMeals";

const AllMeals = () => {
  const [page, setPage] = useState(1);
  const filters = useMemo(() => {
    return {}; // static or dynamic filters go here
  }, []);
  const { meals, loading, setMeals, totalPages, totalMeals } = useMeals(
    filters,
    page,
    10
  );

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";

  if (loading) return <PreLoader className={className} />;

  const sortedMeals = [...meals].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (b.review_count !== a.review_count)
      return b.review_count - a.review_count;
    if (b.likes !== a.likes) return b.likes - a.likes;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  if (!meals || meals.length === 0) {
    return <NoCreatedGroups />;
  }

  return (
    <div>
      <CreatedGroups
        setMeals={setMeals}
        buttonShow={true}
        meals={sortedMeals}
        totalMeals={totalMeals}
      />

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="cursor-pointer disabled:cursor-not-allowed px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1 rounded ${
              page === num + 1
                ? "bg-orange-500 cursor-pointer disabled:cursor-not-allowed text-white"
                : "bg-gray-200 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-300"
            }`}
          >
            {num + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="cursor-pointer disabled:cursor-not-allowed px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMeals;
