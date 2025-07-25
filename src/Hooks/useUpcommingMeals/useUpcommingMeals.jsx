import React, { useEffect, useState } from "react";
import useAxios from "../useAxios";

const useUpcommingMeals = (page = 1, limit, category = "All Categories") => {
  const axiosInstance = useAxios();
  const [upcommingMeals, setUpcommingMeals] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcommingMeals = async () => {
      setLoading(true);
      try {
        let query = `?page=${page}`;
        if (limit !== undefined) query += `&limit=${limit}`;
        if (category && category !== "All Categories") {
          query += `&category=${encodeURIComponent(category)}`;
        }

        const response = await axiosInstance.get(`/upcomming-meals${query}`);
        setUpcommingMeals(response.data.meals);
        setTotal(response.data.total);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcommingMeals();
  }, [axiosInstance, page, limit, category]);

  return { upcommingMeals, setUpcommingMeals, total, loading, error };
};

export default useUpcommingMeals;
