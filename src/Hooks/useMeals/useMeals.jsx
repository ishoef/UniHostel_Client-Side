import { useEffect, useState } from "react";
import useAxios from "../useAxios";

const useMeals = (filters = {}, page = 1, limit = 10) => {
  const axiosInstance = useAxios();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/meals", {
          params: {
            ...filters,
            page,
            limit,
          },
        });

        setMeals(res.data.data || []);
        const totalMeals = res.data.totalMeals || 0;
        setTotalPages(Math.ceil(totalMeals / limit));
        setTotalMeals(totalMeals);
      } catch (err) {
        console.log("Error fetching Meals data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [axiosInstance, JSON.stringify(filters), page, limit]); // ✅ filters is now memoized

  return { meals, loading, setMeals, error, totalPages, totalMeals };
};

export default useMeals;
